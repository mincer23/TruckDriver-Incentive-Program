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

app.post('/login', (req, res) => {
  if (!(req.body.username && req.body.password)) {
    res.sendStatus(400)
  } else {
    req.session.user = {
      id: 1,
      name: 'Michael Scott',
      birthday: Date('10/5/1980'),
      joined: new Date(),
      sponsors: [
        {
          name: 'American United Freight Company, Inc.',
          joined: new Date(),
          id: 1
        },
        {
          name: 'Worldwide Meat Packers & Pipe Layers, LLC.',
          joined: new Date(),
          id: 2
        }
      ]
    }
    res.status(200)
  }
})

// I have a tendency to just shove dev routes in here
app.get('/test', (req, res) => {
  req.session.user = {
    id: 1,
    name: 'Michael Scott',
    birthday: Date('10/5/1980'),
    joined: new Date(),
    sponsor: {
      name: 'American United Freight Company, Inc.',
      id: 1
    }
  }
  res.redirect('/')
})

// Register the app handler with Nuxt
export default {
  path: '/api',
  handler: app
}
