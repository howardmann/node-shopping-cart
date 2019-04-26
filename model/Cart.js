let Cart = module.exports = {}

const {
  Carts
} = require('../db/DB')
const LineItem = require('./LineItem.js')

Cart.create = async () => {
  // Create new Product and return from DB
  let cartId = Carts[Carts.length - 1].id
  let newId = cartId += 1
  let newCart = {
    id: newId,
  }
  await Carts.push(newCart)
  let result = await Cart.findById(newCart.id)
  return Promise.resolve(result)
}

Cart.find = async () => {
  let LineItems = await LineItem.find()
  let carts = Carts.map(el => {
    let lineItems = LineItems.filter(el => el.cart_id === el.id)
    return {
      ...el,
      lineItems
    }
  })
  return Promise.resolve(carts)
}

Cart.findById = async (id) => {
  // Fetch cart
  let cart = Carts.find(el => el.id === id)
  if (!cart) return Promise.reject('no cart found')

  // Fetch cart lineItems
  let lineItems = await LineItem.find().then(result => result.filter(el => el.cart_id === cart.id))
  let lineItemsWithProduct = await Promise.all(lineItems.map(item => {
    return LineItem.findById(item.id)
  }))

  let cartWithLineItems = {
    ...cart,
    lineItems: lineItemsWithProduct
  }
  
  return Promise.resolve(cartWithLineItems)
}
let z = Cart.findById(1)
z


// Cart.create()
//   .then(data => {
//     data
//   })
//   .catch(err => {
//     err
//   })

// let payload = {
//   quantity: 2,
//   product_id: 1,
//   cart_id: 2
// }

// LineItem.create(payload)
//   .then(data => {
//     data
//   })

// Cart.findById(2)
//   .then(data => {
//     data
//   })