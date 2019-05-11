let Order = module.exports = {}

let {
  Orders
} = require('../db/DB')
const LineItem = require('./LineItem.js')

Order.create = async (payload) => {
  let {customer_name} = payload
  
  // Create new order
  let orderId = (Orders.length > 0) ? Orders[Orders.length - 1].id : 0

  let newId = orderId += 1
  let newOrder = {
    id: newId,
    customer_name
  } 
  await Orders.push(newOrder)

  // Return order
  let result = Order.findById(newOrder.id)
  return Promise.resolve(result)  
}

Order.findById = async (id) => {
  // Fetch order
  let order = Orders.find(el => el.id == id)
  if (!order) return Promise.reject('no order found')

  // Fetch order lineItems
  let lineItems = await LineItem.find().then(result => result.filter(el => el.order_id === order.id))
  let lineItemsWithProduct = await Promise.all(lineItems.map(item => {
    return LineItem.findById(item.id)
  }))

  let orderWithLineItems = {
    ...order,
    lineItems: lineItemsWithProduct
  }
  return Promise.resolve(orderWithLineItems)
}

Order.destroy = (id) => {
  // Fetch order
  let order = Orders.find(el => el.id === id)
  if (!order) return Promise.reject('no order found')

  Orders = Orders.filter(el => el.id !== id)
  return Promise.resolve(Orders)
}

// let payload = {
//   cart_id: 1,
//   customer_name: 'howie'
// }
// let input = Order.create(payload) //?

// let actual = {
//   id: 1,
//   customer_name: 'howie',
//   lineItems: [
//     {id: 1, product_id: 1, cart_id: null, quantity: 2, order_id: 1, product: {id: 1, description: 'blue book', price: 10}, subTotal: 20},
//     {
//       id: 2,
//       product_id: 2,
//       cart_id: null,
//       quantity: 1,
//       order_id: 1,
//       product: {
//         id: 2,
//         description: 'red book',
//         price: 15
//       },
//       subTotal: 15
//     },
//     {
//       id: 3,
//       product_id: 3,
//       cart_id: null,
//       quantity: 3,
//       order_id: 1,
//       product: {
//         id: 3,
//         description: 'black book',
//         price: 8
//       },
//       subTotal: 24
//     }
//   ]
// }

