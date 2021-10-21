const express = require('express')
const router = express.Router()

router.get('/profile/:id', (req, res) => {
  // if a desired id is specified, grab the corresponding user from the backend
  if (req.params.id) {
    res.json({
      id: 2,
      name: 'Vin Diesel',
      birthday: Date('10/5/1980'),
      joined: new Date(),
      sponsors: [
        {
          name: 'Family United Air Freight Corporation',
          joined: new Date(),
          id: 3
        },
        {
          name: 'Worldwide Meat Packers & Pipe Layers, LLC.',
          joined: new Date(),
          id: 2
        }
      ]
    })
  } else {
    res.json({
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
    })
  }
})

module.exports = router
