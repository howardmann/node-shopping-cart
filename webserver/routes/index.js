const express = require('express')
const router = express.Router()

// require routes
const products = require('./products')

// products pages
router
  .get('/products', products.index)
  .get('/products/:id', products.show)

module.exports = router