import { prisma } from '../prisma.js'
import { ensureAuthenticated, isPasswordStrong } from '../utilities.js'
const zxcvbn = require('zxcvbn')
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
    res.status(400)
  }
  // is the password strong enough
  if (!isPasswordStrong(password)) {
    res.status(400)
  }
  // does username or email already exist
  const existingUser = await prisma.user.findMany({
    where: {
      OR: [
        { userName },
        { email }
      ]
    }
  })
  // yes
  if (existingUser) {
    res.status(400)
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
  if (newUser) { // create query was successful
    res.status(200)
  } else { // something broke on our end
    res.status(500)
  }
})

router.put('/:id', ensureAuthenticated, async (req, res) => {
  // only allow admins or the user in question to update a user
  if (Number(req.params.id) !== req.session.user.id && !req.session.user.isAdmin) {
    res.status(400)
  }
  const existingData = await prisma.user.findUnique({
    where: {
      id: Number(req.params.id)
    }
  })
  // if user not found
  if (!existingData) {
    res.status(400)
  }
  // let's only take the data we want to update
  const userName = req.body?.userName || existingData.userName
  const passwordHash = zxcvbn(req.body?.password).score > 2 ? await bcrypt.hash(req.body.password) : existingData.passwordHash
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
    res.status(200)
  } else { // something broke on our end
    res.status(500)
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

// commit a point change to a user
router.put('/:userId/:orgId/points', ensureAuthenticated, async (req, res) => {
  // required fields
  const userId = Number(req.params.userId)
  const orgId = Number(req.params.orgId)
  const change = Number(req.body.change)
  if (!userId || !orgId || !change) {
    res.status(400)
  }
  // validate that the user in question exists
  const currentPoints = await prisma.points.findUnique({
    where: {
      userId_orgId: { userId, orgId }
    }
  })
  // no user found
  if (!currentPoints) {
    res.status(400)
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
    res.status(400)
  }
  // cannot adjust points into the negative
  const requestedChange = Number(req.body.change)
  if (currentPoints.balance < requestedChange) {
    res.status(400)
  }
  // all checks passed, perform update
  const result = await prisma.points.update({
    where: {
      userId_orgId: { userId, orgId }
    },
    data: {
      balance: currentPoints.balance - requestedChange
    }
  })
  if (result) {
    res.status(200)
  } else {
    res.status(500)
  }
})

module.exports = router
