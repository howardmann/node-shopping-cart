let LineItem = module.exports = {}
const {Line_Items, Products} = require('../db/DB')

let _validate = async (payload) => {
  let {
    product_id,
    quantity
  } = payload
  let errorMessages = []
  let isValid = true

  let product = await Products.find(el => el.id === product_id)

  if (!product) {
    isValid = false
    errorMessages.push('no product found')
  }

  if (typeof quantity !== 'number') {
    isValid = false
    errorMessages.push('quantity must be a number')
  }

  if (quantity < 1) {
    isValid = false
    errorMessages.push('quantity must be greater than 1')
  }

  return {
    isValid,
    errorMessages
  }
}

LineItem.create = async (payload) => {
  let { product_id, quantity } = payload

  // Catch validation error
  let validation = await _validate(payload)
  if (!validation.isValid) return Promise.reject(validation.errorMessages)

  // Create new lineItem and return from DB
  let lineItemId = Line_Items[Line_Items.length - 1].id
  let newId = lineItemId += 1
  let newLineItem = {
    id: newId,
    product_id,
    quantity
  }
  await Line_Items.push(newLineItem)
  let result = await LineItem.findById(newLineItem.id)
  return Promise.resolve(result)
}

LineItem.find = () => {
  return Promise.resolve(Line_Items)
}

LineItem.findById = async (id) => {
  // Fetch lineitem and associated product
  let lineItem = await Line_Items.find(el => el.id === id)
  if (!lineItem) return Promise.reject('No line item found')
  
  let lineItemProduct = await Products.find(el => el.id === lineItem.product_id)
  if (!lineItemProduct) return Promise.reject('No line item assoc product found')

  // Join, serialize and return
  let lineItemJoin = {...lineItem, product: lineItemProduct}
  return Promise.resolve(_serialize(lineItemJoin))
}

let _serialize = (data) => {
  let {id, product_id, cart_id, quantity, product} = data
  return {
    id,
    productId: product_id,
    cartId: cart_id,
    qty: quantity,
    // relational join
    product
    // computed 
  }
}

// let payload = {
//   product_id: 0,
//   quantity: 1
// }
// let x = LineItem.create(payload)
// x