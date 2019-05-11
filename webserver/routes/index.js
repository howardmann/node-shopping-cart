const express = require('express')
const router = express.Router()
const marked = require('marked')
const fs = require('fs')

// require routes
const products = require('./products')
const carts = require('./carts')
const orders = require('./orders')

router
  .get('/', (req, res, next) => {
    let file = fs.readFileSync('./README.md', 'utf8')
    res.render('README', {body: marked(file.toString())})
  })
  .get('/products', products.index)
  .get('/products/:id', products.show)
  .get('/carts/', carts.show)
  .post('/carts/add/:product_id', carts.addToBasket)
  .post('/carts/deduct/:product_id', carts.deductItem)
  .delete('/carts/', carts.destroy)
  .get('/orders/', orders.show) // via session
  .post('/orders', orders.create)
  .delete('/orders/', orders.destroy)

module.exports = router


