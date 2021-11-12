import validator from 'validator'
import { prisma } from '../prisma.js'
import { ensureAdmin, ensureAuthenticated, ensureSponsor } from '../utilities.js'
const express = require('express')
const router = express.Router()

// get all organizations (used for search/browsing)
router.get('/', ensureAuthenticated, async (req, res) => {
  const result = await prisma.organization.findMany()
  res.json(result)
})

// create new organization (this must be done by a valid registered user)
router.post('/', ensureAdmin, async (req, res) => {
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
      const result = await prisma.organization.create({
        data: {
          name: validator.stripLow(req.body.name)
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

// remove a specific driver from a specific organization and nuke their points
router.delete('/:orgId/driver/:driverId', ensureSponsor, async (req, res) => {
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

module.exports = router
