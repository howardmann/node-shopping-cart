let LineItem = module.exports = {}
const {Line_Items, Products} = require('../db/DB')
let wrapper = require('../util/wrapper')
let validateLineItem = require('./validation/validateLineItem')

LineItem.create = async (payload) => {
  let { product_id, quantity } = payload

  // Check JSON validation schema
  let validation = validateLineItem(payload)
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
  // Fetch lineitem
  const lineItem = await Promise.resolve(Line_Items.find(el => el.id === id))
  if (!lineItem) return Promise.reject('no line item found')

  // Fetch lineItem products
  let productId = lineItem && lineItem.product_id
  let product = Products.find(el => el.id === productId) || null

  let lineItemWithProduct = {...lineItem, product}
  return Promise.resolve(lineItemWithProduct)
}


// Using a wrapper to fail safely
const getLineItem = async (id) => {
  const {error, data } = await wrapper(LineItem.findById(id))
  // able to catch errors
  if (error) return error
  return data
}

let payload = {
  quantity: -1,
  product_id: 'abc'
}

LineItem.create(payload)
  .then(data => {
    data
  })
  .catch(err => {
    err
  })
