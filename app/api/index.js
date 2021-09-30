const express = require('express')

const app = express()

// Import all the various route handlers we need
const userRoutes = require('./routes/user')
const catalogRoutes = require('./routes/catalog')

// Use route handlers
app.use('/user', userRoutes)
app.use('/catalog', catalogRoutes)

// Register the app handler with Nuxt
export default {
  path: '/api',
  handler: app
}
