import { prisma } from '../prisma.js'
import { comparePassword, ensureAuthenticated, ensureAdmin, isPasswordStrong } from '../utilities.js'
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

// get all users
router.get('/', ensureAdmin, async (req, res) => {
  const result = await prisma.user.findMany()
  res.json(result)
})

// create a new user
router.post('/', async (req, res) => {
  const userName = req.body?.userName
  const password = req.body?.password
  const email = req.body?.email
  const firstName = req.body?.firstName
  const lastName = req.body?.lastName
  const question = req.body?.question
  const answer = req.body?.answer
  // do we have all required fields
  if (!(userName && password && email && firstName && lastName && question && answer)) {
    res.sendStatus(400)
    return
  }
  // is the password strong enough
  if (!isPasswordStrong(password)) {
    res.sendStatus(400)
    return
  }
  // does username or email already exist
  // have to destructure because findMany always gives back a list
  const [existingUser] = await prisma.user.findMany({
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

// get all catalogs that a user has access to
router.get('/:userId/catalogs', ensureAuthenticated, async (req, res) => {
  const userId = Number(req.params.userId)
  if (!userId) {
    res.sendStatus(400)
    return
  }

  const result = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      driverFor: {
        select: {
          catalog: true,
          id: true,
          name: true
        }
      },
      staffFor: {
        select: {
          catalog: true,
          id: true,
          name: true
        }
      }
    }
  })
  if (result) {
    res.json(result)
  } else {
    res.sendStatus(400)
  }
})

// update a user
router.put('/:id', ensureAuthenticated, async (req, res) => {
  // only allow admins or the user in question to update a user
  if (Number(req.params.id) !== req.session.user.id && !req.session.user.isAdmin) {
    res.sendStatus(400)
    return
  }
  const existingData = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id)
    }
  })

  // if user not found
  if (!existingData) {
    res.sendStatus(400)
    return
  }

  // if provided old password does not match
  const oldPassMatches = await bcrypt.compare(req.body?.oldpassword, existingData.passwordHash)
  if (!oldPassMatches) {
    res.sendStatus(400)
    return
  }

  // let's only take the data we want to update
  const userName = req.body?.userName || existingData.userName
  const email = req.body?.email || existingData.email
  const firstName = req.body?.firstName || existingData.firstName
  const lastName = req.body?.lastName || existingData.lastName
  const passwordHash = req.body?.password ? await bcrypt.hash(req.body.password, 10) : existingData.passwordHash

  // update the user
  const result = await prisma.user.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      userName,
      email,
      firstName,
      lastName,
      passwordHash
    },
    include: {
      driverFor: true,
      staffFor: true,
      orders: true,
      balances: {
        include: {
          organization: true
        }
      }
    }
  })
  if (result) {
    res.json(result)
  } else { // something broke on our end
    res.sendStatus(500)
  }
})

router.get('/profile/:id', ensureAuthenticated, async (req, res) => {
  let userData = null
  if (req.params.id) { // get the profile they asked for
    userData = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      },
      select: {
        id: true,
        userName: true,
        email: true,
        joined: true,
        firstName: true,
        lastName: true,
        driverFor: true,
        staffFor: true,
        isAdmin: true
      }
    })
    if (userData) {
      res.json(userData)
    }
  } else if (req.session.user) { // get their own profile
    res.json(req.session.user)
  }
})

// get all of a user's outgoing applications
router.get('/:userId/applications', ensureAuthenticated, async (req, res) => {
  const userId = Number(req.params.userId)
  const result = await prisma.application.findMany({
    where: {
      user: {
        id: userId
      }
    },
    include: {
      organization: true
    }
  })
  res.json(result)
})

// get everything that has ever happened to a user ever
router.get('/:userId/logs', ensureAuthenticated, async (req, res) => {
  const userId = Number(req.params.userId)
  const [userData] = await prisma.user.findMany({
    where: {
      id: userId
    },
    include: {
      logs: true
    }
  })
  res.json(userData.logs)
})

// get all of a user's point changes
router.get('/:userId/transactions', async (req, res) => {
  const userId = Number(req.params.userId)
  const [userData] = await prisma.user.findMany({
    where: {
      id: userId
    },
    include: {
      balances: {
        select: {
          balance: true,
          events: true,
          organization: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })
  res.json(userData.balances)
})

// get all the orders belonging to a user
router.get('/:userId/orders', ensureAuthenticated, async (req, res) => {
  const userId = Number(req.params.userId)
  const result = await prisma.order.findMany({
    where: {
      user: {
        id: userId
      }
    },
    include: {
      catalog: {
        include: {
          organization: true
        }
      },
      items: true
    }
  })
  res.json(result)
})

// make a new order
router.post('/:userId/order', ensureAuthenticated, async (req, res) => {
  const userId = Number(req.params.userId)
  if (userId !== Number(req.session.user.id)) {
    res.sendStatus(400)
    return
  }
  const orgId = req.body?.orgId ? Number(req.body.orgId) : null
  const items = req.body?.items
  if (!items || !userId || !orgId || items?.length === 0) {
    console.log(orgId)
    res.sendStatus(400)
    return
  }
  const balance = await prisma.points.findUnique({
    where: {
      userId_orgId: { userId, orgId }
    }
  })
  console.log(balance.balance)
  const totalCostOfItems = await items.reduce((previous, currentelem) => previous + Number(currentelem.price), 0)
  if (!balance || balance.balance < totalCostOfItems) {
    res.sendStatus(400)
    return
  }
  const itemIds = items.map(elem => Object({ id: elem.id }))
  const createOrderResult = await prisma.order.create({
    data: {
      items: {
        connect: itemIds
      },
      user: {
        connect: {
          id: userId
        }
      },
      catalog: {
        connect: {
          orgId
        }
      },
      event: {
        create: {
          user: {
            connect: {
              id: userId
            }
          },
          ipAddress: String(req.ip),
          modelName: 'USER',
          balance: {
            connect: {
              userId_orgId: { userId, orgId }
            }
          },
          oldValue: String(Number(balance.balance)),
          newValue: String(Number(balance.balance) - Number(totalCostOfItems)),
          accessType: 'CREATE'
        }
      }
    }
  })
  if (!createOrderResult) {
    res.sendStatus(500)
    return
  }
  const updatePointBalanceResult = await prisma.points.update({
    where: {
      userId_orgId: { userId, orgId }
    },
    data: {
      balance: balance.balance - totalCostOfItems
    }
  })
  if (!updatePointBalanceResult) {
    res.sendStatus(500)
  } else {
    res.sendStatus(200)
  }
})

// modify an order
router.put('/:userId/order/:orderId', ensureAuthenticated, async (req, res) => {
  const userId = Number(req.params.userId)
  const orderId = Number(req.params.orderId)
  console.log('fuck')
  const status = req.body?.status ? String(req.body?.status) : null
  if (!status || !userId || !orderId) {
    res.sendStatus(400)
    return
  }
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status
    }
  })
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

// get the points of a specific org balance belonging to a user
router.get('/:userId/:orgId/points', ensureAuthenticated, async (req, res) => {
  // required fields
  const userId = Number(req.params.userId)
  const orgId = Number(req.params.orgId)
  if (!userId || !orgId) {
    res.sendStatus(400)
    return
  }
  const balance = await prisma.points.findUnique({
    where: {
      userId_orgId: { userId, orgId }
    },
    select: {
      balance: true
    }
  })

  if (balance) {
    res.json(balance)
  } else {
    res.sendStatus(400)
  }
})

// commit a point change to a user
// `change` field in PUT data should be positive for addition, negative for subtraction.
router.put('/:userId/:orgId/points', ensureAuthenticated, async (req, res) => {
  // required fields
  const userId = Number(req.params.userId)
  const orgId = Number(req.params.orgId)
  const change = Number(req.body.change)
  if (!userId || !orgId || !change) {
    res.sendStatus(400)
  }
  // validate that the user in question exists
  const currentPoints = await prisma.points.findUnique({
    where: {
      userId_orgId: { userId, orgId }
    }
  })
  // no user found
  if (!currentPoints) {
    res.sendStatus(400)
  }
  // verify that initiator user is either admin or staff for this org
  const staffUsers = await prisma.user.findMany({
    where: {
      staffFor: {
        some: { id: orgId }
      }
    },
    select: { id: true }
  })
  const staffIds = staffUsers.map(elem => elem.id)
  // initiator not admin and not staff in this org
  if (!staffIds.includes(Number(req.session.user.id)) && !req.session.user.isAdmin) {
    res.sendStatus(400)
  }

  const requestedChange = Number(req.body.change)

  // cannot adjust points into the negative. if delta negative and abs > current:
  if (requestedChange < 0 && currentPoints.balance < Math.abs(requestedChange)) {
    res.sendStatus(400)
  }
  // all checks passed, perform update
  const result = await prisma.points.update({
    where: {
      userId_orgId: { userId, orgId }
    },
    data: {
      balance: Number(currentPoints.balance) + requestedChange
    }
  })
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

// recover a lost password
router.post('/forgotPassword', async (req, res) => {
  const userName = String(req?.body?.userName)
  const secretQuestion = Number(req?.body?.question)
  const secretAnswer = String(req?.body?.answer)
  const newPassword = String(req?.body?.newPassword)
  // required fields check
  if (!userName || (secretAnswer === undefined || secretAnswer === '') || secretQuestion === undefined || !newPassword) {
    res.sendStatus(400)
    return
  }
  const userData = await prisma.user.findUnique({
    where: {
      userName
    }
  })
  // no user found
  if (!userData) {
    res.sendStatus(400)
    return
  }
  // secret question doesnt match
  if (secretQuestion !== userData.secretQuestion) {
    res.sendStatus(400)
    return
  }
  // secret answer doesnt match
  if (!(await comparePassword(secretAnswer, userData.secretAnswerHash))) {
    res.sendStatus(400)
  } else {
    const result = await prisma.user.update({
      where: {
        userName
      },
      data: {
        passwordHash: await bcrypt.hash(newPassword, 10)
      },
      include: {
        driverFor: true,
        staffFor: true,
        orders: true,
        balances: {
          include: {
            organization: true
          }
        }
      }
    })
    if (result) {
      delete result.passwordHash
      delete result.secretQuestion
      delete result.secretAnswerHash
      req.session.user = result
      res.json(result)
    } else {
      res.sendStatus(500)
    }
  }
})

module.exports = router
