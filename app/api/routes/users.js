import { prisma } from '../prisma.js'
import { ensureAuthenticated, ensureSponsor, isPasswordStrong } from '../utilities.js'
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  const userName = req.body?.userName
  const password = req.body?.password
  const email = req.body?.email
  const firstName = req.body?.firstName
  const lastName = req.body?.lastName
  // do we have all required fields
  if (!(userName && password && email && firstName && lastName)) {
    res.sendStatus(400)
  }
  // is the password strong enough
  if (!isPasswordStrong(password)) {
    res.sendStatus(400)
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
  }
  // no
  const newUser = await prisma.user.create({
    data: {
      userName,
      passwordHash: await bcrypt.hash(password, 10),
      email,
      firstName,
      lastName
    }
  })
  if (await newUser) { // create query was successful
    res.sendStatus(200)
  } else { // something broke on our end
    res.sendStatus(500)
  }
})

router.put('/:id', ensureAuthenticated, async (req, res) => {
  // only allow admins or the user in question to update a user
  if (Number(req.params.id) !== req.session.user.id && !req.session.user.isAdmin) {
    res.sendStatus(400)
  }
  const existingData = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id)
    }
  })

  // if user not found
  if (!existingData) {
    res.sendStatus(400)
  }

  // if provided old password does not match
  const oldPassMatches = await bcrypt.compare(req.body?.oldpassword, existingData.passwordHash)
  if (!oldPassMatches) {
    res.sendStatus(400)
  }

  // let's only take the data we want to update
  const userName = req.body?.userName || existingData.userName
  const passwordHash = isPasswordStrong(req.body?.password) ? await bcrypt.hash(req.body.password, 10) : existingData.passwordHash
  const email = req.body?.email || existingData.email
  const firstName = req.body?.firstName || existingData.firstName
  const lastName = req.body?.lastName || existingData.firstName

  // update the user
  const result = await prisma.user.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      userName,
      passwordHash,
      email,
      firstName,
      lastName
    }
  })
  if (result) {
    res.sendStatus(200)
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

module.exports = router
