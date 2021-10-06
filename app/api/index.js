const express = require('express')

const app = express()

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

// I have a tendency to just shove dev routes in here
app.get('/test', (req, res) => {
  req.session.user = {
    id: 1,
    name: 'Michael Scott',
    birthday: Date('10/5/1980'),
    joined: new Date()
  }
  res.json(req.session.user)
})

// Register the app handler with Nuxt
export default {
  path: '/api',
  handler: app
}
