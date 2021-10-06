const express = require('express')
const router = express.Router()

router.get('/profile/:id', (req, res) => {
  // if a desired id is specified, grab the corresponding user from the backend
  if (req.params.id) {
    res.json({
      id: 2,
      name: 'Matt Damon',
      birthday: Date('04/20/1984'),
      joined: new Date()
    })
  } else {
    res.json({
      id: 1,
      name: 'Michael Scott',
      birthday: Date('10/5/1980'),
      joined: new Date()
    })
  }
})

module.exports = router
