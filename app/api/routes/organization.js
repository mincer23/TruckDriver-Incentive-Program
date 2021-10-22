import validator from 'validator'
import { prisma } from '../prisma.js'
const express = require('express')
const router = express.Router()

// get all organizations (used for search/browsing)
router.get('/list', async (req, res) => {
  const result = await prisma.organization.findMany()
  res.json(result)
})

// create new organization (this must be done by a currently signed in user)
router.post('/', async (req, res) => {
  // check for required fields
  if (req?.body?.name) {
    // check db for existing orgs
    const exists = await prisma.organization.findUnique({
      where: {
        name: validator.stripLow(req.body.name)
      }
    })
    if (exists) {
      res.status(303) // https://stackoverflow.com/a/40504085 303 for conflcits
    } else {
      // create org with all bindings
      const result = await prisma.organization.create({
        data: {
          name: validator.stripLow(req.body.name)
        }
      })
      if (result) {
        res.status(200)
      } else {
        res.status(500)
      }
    }
  } else {
    res.status(400)
  }
})

module.exports = router
