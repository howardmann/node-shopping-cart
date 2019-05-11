let Carts = module.exports = {}

let Cart = require('../model/Cart')
let Product = require('../model/Product')
let LineItem = require('../model/LineItem')
let wrapper = require('../util/wrapper')

Carts.create = () => {
  return Cart.create()
    .then(data => {
      return data
    })
}

Carts.find = () => {
  return Cart.find().then(data => {
    return data
  })
}

Carts.findById = (id) => {
  return Cart.findById(id).then(data => {
    // Find associated lineItem product names
    return data
  })
}

Carts.updateQuantity = async (payload) => {
  let {product_id, cart_id, action} = payload
  // Check that product exists
  let product = await Product.findById(product_id)
  if (!product) Promise.reject('no product found')

  // Check that cart exists
  let cart = await Cart.findById(cart_id)
  if (!cart) Promise.reject('no cart found')

  // Find if lineItem exists in cart
  let lineItem = cart.lineItems.find(el => el.product_id === product_id)

  // Product lineItem does not exist in cart
    // ? create new lineItem linked to product_id and cart_id
    // : increment quantity  
  if (action === 'ADD') {
    !lineItem ? await LineItem.create({product_id, cart_id, quantity: 1})
              : await LineItem.update(lineItem.id, {quantity: lineItem.quantity += 1})
  }

  // Product is at 1 or less quantity
    // ? destroy from cart
    // : decrement quantity    
  if (action === 'DEDUCT') {
    if (!lineItem) return Promise.reject('line item does not exist')

    lineItem.quantity <= 1  ? await LineItem.destroy(lineItem.id)
                            : await LineItem.update(lineItem.id, {quantity: lineItem.quantity -= 1})
  }
  
  // Resolve with updated cart
  return await Promise.resolve(Cart.findById(cart_id))
}

Carts.destroy = (id) => {
  return Cart.destroy(id)
    .then(data => {
      return data
    })
}

// let test = async () => {
//   // Create new cart
//   await Carts.create()
//   // Add items
//   await Carts.updateQuantity({product_id: 3, cart_id: 2, action: "ADD"})
//   await Carts.updateQuantity({product_id: 3, cart_id: 2, action: "ADD"})
//   // await Carts.updateQuantity({product_id: 3, cart_id: 2, action: "ADD"})
//   let {error, data } = await wrapper(Carts.updateQuantity({product_id: 3,cart_id: 2, action: "DEDUCT"}))
//   error
//   data //?
//   let carts = await Cart.find() //?

// }

// test()
