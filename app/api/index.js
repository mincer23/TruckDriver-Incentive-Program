import { prisma } from './prisma.js'
import { comparePassword, ensureAdmin } from './utilities.js'

const express = require('express')
const session = require('express-session')
const app = express()
app.use(session({
  secret: 'legalize glue',
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.json())
app.use(express.urlencoded())

// Import all the various route handlers we need
const userRoutes = require('./routes/users')
const catalogRoutes = require('./routes/catalogs')
const organizationRoutes = require('./routes/organizations')

// Use route handlers
app.use('/users', userRoutes)
app.use('/catalogs', catalogRoutes)
app.use('/organizations', organizationRoutes)

// There are a few root-level routes we need to take care of
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.post('/login', async (req, res) => {
  // check that required fields are here
  if (!(req?.body?.username || req?.body?.userName) || !req?.body?.password) {
    res.sendStatus(400) // if not, yell at the user
  } else {
    // fetch the user matching the username provided
    const userData = await prisma.user.findUnique({
      where: {
        userName: req.body.username || req.body.userName
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
    if (userData) { // prisma returns null on no object found
      if (await comparePassword(req.body.password, userData.passwordHash)) {
        delete userData.passwordHash // dont put the password in the session obj
        delete userData.secretAnswerHash // dont put any secret stuff in session obj
        delete userData.secretQuestion
        req.session.user = userData
        res.json(userData)
      } else { // bad password
        // eslint-disable-next-line no-unused-vars
        const badPasswordResult = await prisma.user.update({
          where: {
            id: userData.id
          },
          data: {
            logs: {
              create: {
                modelName: 'USER',
                accessType: 'MODIFY',
                ipAddress: req.ip
              }
            }
          }
        })
        res.sendStatus(400)
      }
    } else { // no user found
      res.sendStatus(400)
    }
  }
})

app.post('/updateStatus', async (req, res) => {
  if (!req?.body?.username) {
    res.sendStatus(400)
  } else {
    const userData = await prisma.user.findUnique({
      where: {
        userName: req.body.username
      },
      include: {
        driverFor: true,
        staffFor: true,
        orders: true,
        balances: true
      }
    })

    if (userData) {
      req.session.user = userData
      res.json(userData)
    }
  }
})

app.get('/session', (req, res) => {
  res.json(req.session.user)
})

app.get('/events', ensureAdmin, async (req, res) => {
  const events = await prisma.logEvent.findMany({
    include: {
      user: true,
      transaction: true,
      balance: {
        include: {
          organization: true
        }
      }
    }
  }) // yes, this is in earnest.
  res.json(events)
})

// Register the app handler with Nuxt
export default {
  path: '/api',
  handler: app
}
