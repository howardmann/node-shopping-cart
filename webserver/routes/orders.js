const OrdersRoutes = module.exports = {}

// Require controllers
const orders = require('../../controller/orders')

OrdersRoutes.create = async (req, res, next) => {
  let {cart_id, customer_name} = req.body
  // Create new order
  let order = await orders.create({
    cart_id: Number(cart_id), 
    customer_name
  })
  
  // Clear cart from session
  req.session.cart = null

  // Save order into session
  req.session.order = order

  // Redirect to orders page
  res.redirect(`/orders`)
}

OrdersRoutes.show = async (req, res, next) => {
  // access order from session
  let order = req.session.order

  let id = order.id
  return orders.findById(id)
    .then(data => {
      res.render('order', {data})
    })
}

OrdersRoutes.destroy = (req, res, next) => {
  let order_id = req.session.order.id

  orders.destroy(order_id)
    .then(data => {
      req.session.order = null
      res.redirect('/')
    })
}
