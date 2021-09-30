const express = require('express')
const router = express.Router()

router.get('/test', (req, res) => {
  res.json({ yee: 'haw' })
})

module.exports = router
