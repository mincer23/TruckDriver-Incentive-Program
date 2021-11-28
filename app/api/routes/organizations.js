import validator from 'validator'
import { prisma } from '../prisma.js'
import { ensureAdmin, ensureAuthenticated, ensureSponsor } from '../utilities.js'
const bcrypt = require('bcrypt')
const express = require('express')
const upload = require('multer')({ dest: 'static/uploads/' })
const router = express.Router()

router.get('/:id/events', async (req, res) => {
  const query = await prisma.logEvent.findMany({
    include: {
      user: true,
      balance: {
        include: {
          organization: true
        }
      }
    }
  })
  const result = query.filter(elem => elem?.balance?.organization.id === Number(req.params.id))
  res.json(result)
})

// a different approach that's useful for us in admin page
router.get('/transactions', async (req, res) => {
  const transactions = await prisma.organization.findMany({
    include: {
      drivers: {
        select: {
          logs: {
            where: {
              transactionId: {
                not: null
              }
            }
          },
          firstName: true,
          lastName: true,
          id: true
        }
      }
    }
  })
  const purchaseCounts = await prisma.item.findMany({
    select: {
      _count: {
        select: {
          orders: true
        }
      },
      price: true,
      name: true
    }
  })
  const driverPurchases = await prisma.user.findMany({
    include: {
      orders: {
        include: {
          event: true,
          catalog: {
            include: {
              organization: true
            }
          },
          _count: {
            select: {
              items: true
            }
          }
        }
      }
    }
  })
  res.json({ transactions, purchaseCounts, driverPurchases })
})

// get all organizations (used for search/browsing)
router.get('/', ensureAuthenticated, async (req, res) => {
  const result = await prisma.organization.findMany({
    include: {
      _count: {
        select: {
          drivers: true,
          staff: true
        }
      }
    }
  })
  res.json(result)
})

// get the details of the specific organization
router.get('/:id', ensureAuthenticated, async (req, res) => {
  const result = await prisma.organization.findUnique({
    where: {
      id: Number(req.params.id)
    },
    include: {
      drivers: {
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          email: true
        }
      },
      staff: {
        select: {
          id: true,
          userName: true,
          firstName: true,
          lastName: true,
          email: true
        }
      }
    }
  })
  res.json(result)
})

// create new organization (this must be done by a valid registered user)
router.post('/', ensureAuthenticated, async (req, res) => {
  // check for required fields
  if (req?.body?.name) {
    // check db for existing orgs
    const exists = await prisma.organization.findUnique({
      where: {
        name: validator.stripLow(req.body.name)
      }
    })
    if (exists) {
      res.sendStatus(303) // https://stackoverflow.com/a/40504085 303 for conflcits
    } else {
      // create org with all bindings
      const result = await prisma.catalog.create({
        data: {
          organization: {
            create: {
              name: validator.stripLow(req.body.name),
              staff: {
                connect: {
                  id: req.session.user.id
                }
              }
            }
          }
        }
      })
      if (result) {
        res.sendStatus(200)
      } else {
        res.sendStatus(500)
      }
    }
  } else {
    res.sendStatus(400)
  }
})

router.post('/:orgId/user', ensureSponsor, async (req, res) => {
  const orgId = req.params?.orgId
  const userName = req.body?.userName
  const password = req.body?.password
  const email = req.body?.email
  const firstName = req.body?.firstName
  const lastName = req.body?.lastName
  const question = req.body?.question
  const answer = req.body?.answer
  // do we have all required fields
  if (!userName || !password || !email || !firstName || !lastName || typeof question === 'undefined' || !answer) {
    res.sendStatus(400)
    return
  }
  // does username or email already exist
  // have to destructure because findMany always gives back a list
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { userName },
        { email }
      ]
    }
  })
  // yes
  if (existingUser) {
    res.sendStatus(400)
    return
  }
  // no
  const newUser = await prisma.user.create({
    data: {
      userName,
      passwordHash: await bcrypt.hash(password, 10),
      email,
      firstName,
      lastName,
      staffFor: {
        connect: {
          id: Number(orgId)
        }
      },
      secretQuestion: Number(question),
      secretAnswerHash: await bcrypt.hash(answer, 10)
    }
  })
  if (await newUser) { // create query was successful
    res.sendStatus(200)
  } else { // something broke on our end
    res.sendStatus(500)
  }
})

// update organization info (including header image)
router.put('/:orgId', ensureSponsor, upload.single('headerImage'), async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  // did they even give us anything to update
  if ((!req.file && !req.body.name) || !req.params.orgId) {
    res.sendStatus(400)
    return
  }

  // is the org they asked for even real
  const orgData = await prisma.organization.findUnique({
    where: { id: Number(req.params.orgId) },
    include: { staff: true }
  })

  if (!orgData) {
    res.sendStatus(404) // not found
    return
  }

  const result = await prisma.organization.update({
    where: {
      id: Number(req.params.orgId)
    },
    data: {
      name: req.body.name || orgData.name,
      headerImage: req?.file?.filename
    }
  })
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

// accept or reject an incoming organization
router.post('/:orgId/status', ensureAdmin, async (req, res) => {
  // required fields
  if (typeof req.body.approve === 'undefined') {
    // we can't use just !req.body.approve since it's a boolean, may be false
    res.sendStatus(400)
  }

  // verify org exists
  const orgData = await prisma.organization.findUnique({
    where: {
      id: Number(req.params.orgId),
      confirmed: false
    }
  })

  if (!orgData) {
    res.sendStatus(404)
  }

  const approve = Boolean(req.body.approve)
  let result = null
  if (approve) { // mark the org as ok to go
    result = await prisma.organization.update({
      where: {
        id: Number(req.params.orgId)
      },
      data: {
        confirmed: true
      }
    })
  } else { // purge the org from existence
    result = await prisma.organization.delete({
      where: {
        id: Number(req.params.orgId)
      }
    })
  }
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

// get all the applications that are attached to this organization
router.get('/:orgId/applications', ensureSponsor, async (req, res) => {
  const orgId = Number(req.params.orgId)
  const result = await prisma.application.findMany({
    where: {
      organization: {
        id: orgId
      },
      status: 'WAITING'
    },
    include: {
      user: true
    }
  })
  res.json(result)
})

// remove a specific driver from a specific organization and nuke their points
router.delete('/:orgId/driver/:driverId', ensureSponsor, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  // required params
  if (!(req.params.orgId && req.params.driverId)) {
    res.sendStatus(400)
  }

  // make our params just a little easier to work with
  const orgId = Number(req.params.orgId)
  const driverId = Number(req.params.driverId)
  const requesterId = Number(req.session.user.id)

  // verify that the sponsor who submitted this request was a staffer for the
  // org to which the user in question belongs
  const driverOrgs = await prisma.user.findUnique({
    where: {
      id: driverId
    },
    select: {
      driverFor: true
    }
  })
  const requesterOrgs = await prisma.user.findUnique({
    where: {
      id: requesterId
    },
    select: {
      staffFor: true
    }
  })
  const driverOrgIds = driverOrgs.driverFor.map(elem => elem.id)
  const requesterOrgIds = requesterOrgs.staffFor.map(elem => elem.id)
  // if the requester is a manager for an org that the driver belongs to
  if (!(requesterOrgIds.includes(orgId) && driverOrgIds.includes(orgId))) {
    res.sendStatus(400)
  }
  // remove user from org
  const orgDelete = await prisma.organization.update({
    where: {
      id: orgId
    },
    data: {
      drivers: {
        disconnect: {
          id: driverId
        }
      }
    }
  })
  if (!orgDelete) {
    res.sendStatus(500)
  }
  const pointsDelete = await prisma.points.delete({
    where: {
      userId_orgId: { userId: driverId, orgId }
    }
  })

  if (!pointsDelete) {
    res.sendStatus(500)
  }

  res.sendStatus(200)
})

// remove a specific staffer from a specific organization
router.delete('/:orgId/staff/:staffId', ensureSponsor, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  // required params
  if (!(req.params.orgId && req.params.staffId)) {
    res.sendStatus(400)
    return
  }

  // make our params just a little easier to work with
  const orgId = Number(req.params.orgId)
  const staffId = Number(req.params.staffId)
  const requesterId = Number(req.session.user.id)

  // verify that the sponsor who submitted this request was a staffer for the
  // org to which the user in question belongs
  const staffOrgs = await prisma.user.findUnique({
    where: {
      id: staffId
    },
    select: {
      staffFor: true
    }
  })
  const requesterOrgs = await prisma.user.findUnique({
    where: {
      id: requesterId
    },
    select: {
      staffFor: true
    }
  })
  const staffOrgIds = staffOrgs.staffFor.map(elem => elem.id)
  const requesterOrgIds = requesterOrgs.staffFor.map(elem => elem.id)
  // if the requester is a manager for an org that the driver belongs to
  if (!(requesterOrgIds.includes(orgId) && staffOrgIds.includes(orgId)) && !req.session.user.isAdmin) {
    res.sendStatus(400)
    return
  }
  // remove user from org
  const orgDelete = await prisma.organization.update({
    where: {
      id: orgId
    },
    data: {
      staff: {
        disconnect: {
          id: staffId
        }
      }
    }
  })
  if (!orgDelete) {
    res.sendStatus(500)
    return
  }

  res.sendStatus(200)
})

// apply to an organization
router.post('/:orgId/application', ensureAuthenticated, async (req, res) => {
  // required fields
  const userId = req.body?.userId ? Number(req.body.userId) : null
  const orgId = Number(req.params.orgId)
  if (!userId || !orgId) {
    res.sendStatus(400)
    return
  }
  const result = await prisma.application.create({
    data: {
      user: {
        connect: {
          id: userId
        }
      },
      organization: {
        connect: {
          id: orgId
        }
      }
    }
  })
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

// update an application
router.put('/:orgId/applications/:appId', ensureSponsor, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  const result = await prisma.application.update({
    where: {
      id: Number(req.params.appId)
    },
    data: {
      status: req.body.accept ? 'ACCEPTED' : 'DENIED'
    },
    include: {
      user: true
    }
  })
  if (req.body.accept && result) {
    const addUser = await prisma.organization.update({
      where: {
        id: Number(req.params.orgId)
      },
      data: {
        drivers: {
          connect: {
            id: Number(result.user.id)
          }
        }
      }
    })
    if (!addUser) {
      res.sendStatus(400)
      return
    }
    const createPoints = await prisma.points.create({
      data: {
        user: {
          connect: {
            id: Number(result.user.id)
          }
        },
        organization: {
          connect: {
            id: Number(req.params.orgId)
          }
        },
        balance: 0
      }
    })
    if (!createPoints) {
      res.sendStatus(400)
      return
    }
  }
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

module.exports = router
