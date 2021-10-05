const express = require('express')
const router = express.Router()

router.get('/profile', (req, res) => {
  res.json({
    id: 1,
    name: 'Michael Scott',
    birthday: Date('10/5/1980'),
    joined: new Date()
  })
})

module.exports = router
