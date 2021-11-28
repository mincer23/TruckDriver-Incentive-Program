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
      items: true,
      organization: true
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

router.post('/deleteitem/:itemId', ensureSponsor, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  const itemId = req.params.itemId ? Number(req.params.itemId) : null
  if (!itemId) {
    res.sendStatus(400)
    return
  }
  const result = await prisma.item.delete({
    where: {
      id: itemId
    }
  })
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

// CORS bypass lmao
router.get('/etsyActive', ensureAuthenticated, async (req, res) => {
  const listings = await axios.get('https://openapi.etsy.com/v2/listings/active?api_key=vh0cf53nxhvc871sc5b2eabr')
    .then(res => res.data)
    .then(res => res.results)
  res.json(listings)
})

// lazy load support to not make etsy want to die
router.get('/image/:etsyId', ensureAuthenticated, async (req, res) => {
  const etsyId = String(req.params.etsyId)
  if (!etsyId) {
    res.sendStatus(400)
    return
  }
  const image = await axios.get('https://openapi.etsy.com/v2/listings/' + etsyId + '/images?api_key=vh0cf53nxhvc871sc5b2eabr')
    .then(res => res.data)
    .then(res => res.results)
    .then(res => res[0])
    .then(res => res.url_170x135)
  require('request').get(image).pipe(res)
})

module.exports = router
