let LineItem = module.exports = {}
const {Line_Items, Products, Carts} = require('../db/DB')
let wrapper = require('../util/wrapper')
let {validateLineItemCreate, validateLineItemUpdate} = require('./validation/validateLineItem')


LineItem.create = async (payload) => {
  let { product_id, cart_id, quantity } = payload

  // Check JSON validation schema
  let validation = validateLineItemCreate(payload)
  if (validation.error) return Promise.reject(validation.error.details)

  // Check if product exists
  let product = await Products.find(el => el.id === product_id)
  if (!product) return Promise.reject('no product found')

  // Create new lineItem and return from DB
  let lineItemId = Line_Items[Line_Items.length - 1].id
  let newId = lineItemId += 1
  let newLineItem = {
    id: newId,
    product_id,
    quantity,
    cart_id
  }
  
  await Line_Items.push(newLineItem)
  let result = await LineItem.findById(newLineItem.id)
  return Promise.resolve(result)
}

LineItem.find = () => {
  return Promise.resolve(Line_Items)
}

LineItem.findById = async (id) => {
  // Fetch lineitem
  const lineItem = await Promise.resolve(Line_Items.find(el => el.id === id))
  if (!lineItem) return Promise.reject('no line item found')

  // Fetch lineItem products
  let productId = lineItem && lineItem.product_id
  let product = Products.find(el => el.id === productId) || null

  let lineItemWithProduct = {...lineItem, product}
  return Promise.resolve(lineItemWithProduct)
}

LineItem.update = async (id, payload) => {
  let { product_id, cart_id, quantity } = payload
  
  // Find lineitem and its index position in DB
  const lineItem = await Promise.resolve(Line_Items.find(el => el.id === id))
  if (!lineItem) return Promise.reject('no line item found')
  const lineIndex = Line_Items.findIndex(el => el.id === id)

  // Check JSON validation schema (not required)
  let validation = validateLineItemUpdate(payload)
  if (validation.error) return Promise.reject(validation.error.details)

  // Check if product exists
  if (product_id) {
    let product = await Products.find(el => el.id === product_id)
    if (!product) return Promise.reject('no product found')
  }

  // Check if cart exists
  if (cart_id) {
    let cart = await Carts.find(el => el.id === cart_id)
    if (!cart) return Promise.reject('no cart found')
  }
  
  Line_Items
  
  Line_Items[lineIndex].product_id = product_id || Line_Items[lineIndex].product_id
  Line_Items[lineIndex].cart_id = cart_id || Line_Items[lineIndex].cart_id
  Line_Items[lineIndex].quantity = quantity || Line_Items[lineIndex].quantity

  return Promise.resolve(Line_Items[lineIndex])
}


// Using a wrapper to fail safely
const getLineItem = async (id) => {
  const {error, data } = await wrapper(LineItem.findById(id))
  // able to catch errors
  if (error) return error
  return data
}

let test = async () => {
  let payload = {
    quantity: 2,
    product_id: 1,
    cart_id: 1
  }

  var {error, data} = await wrapper(LineItem.create(payload))
  error
  data

  var {error, data} = await wrapper(LineItem.update(4, {
    quantity: 32,
    product_id: 2,
    cart_id: 1
  }))
  error
  data
  
  Line_Items
}

test()