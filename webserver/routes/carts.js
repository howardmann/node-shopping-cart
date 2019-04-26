const CartsRoutes = module.exports = {}

// Require controllers
const carts = require('../../controller/carts')

CartsRoutes.show = async (req, res, next) => {
  // access cart from session
  let cart = req.session.cart || await carts.create()

  carts.findById(cart.id)  
    .then(data => {
      req.session.cart = data
      res.render('cart', {data})
    })
}

CartsRoutes.addToBasket = async (req, res, next) => {
  let product_id = Number(req.params.product_id)
  // access cart from session
  let cart = req.session.cart || await carts.create()
  let cart_id = cart.id

  carts.updateQuantity({product_id, cart_id, action: 'ADD'})
    .then(data => {
      req.session.cart = data
      res.redirect(`/carts/`)
    })
}

CartsRoutes.deductItem = async (req, res, next) => {
  let product_id = Number(req.params.product_id)
  let cart = req.session.cart || await carts.create()
  let cart_id = cart.id

  carts.updateQuantity({product_id, cart_id, action: 'DEDUCT'})
    .then(data => {
      req.session.cart = data
      res.redirect(`/carts/`)
    })
}

