const express = require('express')
const router = express.Router()

// require routes
const products = require('./products')
const carts = require('./carts')

router
  .get('/products', products.index)
  .get('/products/:id', products.show)
  .get('/carts/', carts.show)
  .post('/carts/add/:product_id', carts.addToBasket)
  .post('/carts/deduct/:product_id', carts.deductItem)

module.exports = router