import { prisma } from './prisma.js'
const bcrypt = require('bcrypt')

const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded())

// Import all the various route handlers we need
const userRoutes = require('./routes/user')
const catalogRoutes = require('./routes/catalog')

// Use route handlers
app.use('/user', userRoutes)
app.use('/catalog', catalogRoutes)

// There are a few root-level routes we need to take care of
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

app.post('/login', async (req, res) => {
  // check that required fields are here
  if (!req?.body?.username || !req?.body?.password) {
    res.sendStatus(400) // if not, yell at the user
  } else {
    // fetch the user matching the username provided
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
    if (userData) { // prisma returns null on no object found
      if (comparePassword(req.body.password, userData.passwordHash)) {
        delete userData.passwordHash // dont put the password in the session obj
        res.json(userData)
      } else { // bad password
        res.sendStatus(400)
      }
    } else { // no user found
      res.sendStatus(400)
    }
  }
})

// https://www.thiscodeworks.com/async-function-for-bcrypt-compare-bcrypt-authentication-express-nodejs-password/60bcedfdf7d259001478aeb7
const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    console.log(error)
  }
  return false
}

// Register the app handler with Nuxt
export default {
  path: '/api',
  handler: app
}
