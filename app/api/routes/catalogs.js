import { prisma } from '../prisma.js'
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ yee: 'haw' })
})

module.exports = router
