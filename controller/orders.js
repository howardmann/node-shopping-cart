let Orders = module.exports = {}

let Order = require('../model/Order')
let Cart = require('../model/Cart')
let LineItem = require('../model/LineItem')

Orders.create = async (payload) => {
  let {cart_id, customer_name} = payload
  
  // Check that cart exists
  let cart = await Cart.findById(cart_id)
  if (!cart) return Promise.reject('no cart found')

  // Create new order
  let order = await Order.create({customer_name})

  // Fetch lineItems of cart and replace order_id with new order
  // disassociate with cart and replace cart_id to null
  let lineItems = await LineItem.find().then(result => result.filter(el => el.cart_id === cart.id))
  let updatedLineItems = await Promise.all(lineItems.map(item => {
    return LineItem.update(item.id, {order_id: order.id,cart_id: null})
      .then(item => {
        return LineItem.findById(item.id)
      })
  }))
  
  // Destroy cart
  await Cart.destroy(cart.id)
  
  let result = await Order.findById(order.id)
  return Promise.resolve(result) 
}

Orders.findById = (id) => {
  return Order.findById(id).then(data => {
    // Find associated lineItem product names
    return data
  })
}

Orders.destroy = (id) => {
  return Order.destroy(Number(id))
    .then(data => {
      return data
    })
}

// let payload = {
//   cart_id: 1,
//   customer_name: 'felix'
// }

// Orders.create(payload) //?

