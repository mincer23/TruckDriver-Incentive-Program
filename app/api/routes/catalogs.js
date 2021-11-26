import { prisma } from '../prisma.js'
import { ensureAuthenticated, ensureSponsor } from '../utilities.js'
const axios = require('axios')
const express = require('express')
const router = express.Router()

// get all items in a catalog
router.get('/:id/items', ensureAuthenticated, async (req, res) => {
  const catalogData = await prisma.catalog.findUnique({
    where: {
      id: Number(req.params.id)
    },
    include: {
      items: true
    }
  })
  // catalog does not exist
  if (!catalogData) {
    res.sendStatus(400)
    return
  }
  res.json(catalogData)
})

// add a new item to a catalog
router.post('/:id/item', ensureSponsor, async (req, res) => {
  const catalogId = req.params.id ? Number(req.params.id) : null
  const etsyId = req.body?.etsyId ? Number(req.body?.etsyId) : null
  const name = req.body?.name ? String(req.body?.name) : null
  const description = req.body?.description ? String(req.body?.description) : null
  const price = req.body?.price ? Number(req.body?.price) : null
  if (!price || !description || !name || !etsyId || !catalogId) {
    res.sendStatus(400)
    return
  }
  // axios is literal dogshit and needs to stop being used asap
  // this callback hell is actually necessary. axios doesn't guarantee that any
  // of these are resolved until you specifically ask about it lmao
  const image = await axios.get('https://openapi.etsy.com/v2/listings/' + etsyId + '/images?api_key=vh0cf53nxhvc871sc5b2eabr')
    .then(res => res.data)
    .then(res => res.results)
    .then(res => res[0])
    .then(res => res.url_170x135)
  const result = await prisma.item.create({
    data: {
      etsyId,
      name,
      description,
      price,
      image,
      catalogs: {
        connect: {
          id: catalogId
        }
      }
    }
  })
  res.json(result)
})

module.exports = router
