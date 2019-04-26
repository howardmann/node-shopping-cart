const CartsRoutes = module.exports = {}

// Require controllers
const carts = require('../../controller/carts')


//TODO: USE SESSIONS
const CART_ID = 1


CartsRoutes.show = (req, res, next) => {
  let id = Number(req.params.id)
  carts.findById(id)
    .then(data => {
      res.render('cart', {
        lineItems: data.lineItems
      })
    })
}

CartsRoutes.addToBasket = (req, res, next) => {
  let product_id = Number(req.params.product_id)
  let cart_id = CART_ID

  carts.updateQuantity({product_id, cart_id, action: 'ADD'})
    .then(() => {
      res.redirect(`/carts/${cart_id}`)
    })
}

CartsRoutes.deductItem = (req, res, next) => {
  let product_id = Number(req.params.product_id)
  let cart_id = CART_ID

  carts.updateQuantity({product_id, cart_id, action: 'DEDUCT'})
    .then(() => {
      res.redirect(`/carts/${cart_id}`)
    })
}

