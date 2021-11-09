import e from 'express'
import { prisma } from '../prisma.js'
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ yee: 'haw' })
})


router.post('/updateCart', (req, res) => {
  this.cart.push(item)
})

module.exports = router
