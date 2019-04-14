let Product = module.exports = {}

const { Products } = require('../db/DB')


let _validate = (payload) => {
  let { description, price } = payload
  let errorMessages = []
  let isValid = true

  if (!price) {
    isValid = false
    errorMessages.push('price is required')
  }
  if (price && typeof price !== 'number') {
    isValid = false
    errorMessages.push('price must be number')
  }
  if (price < 0.01) {
    isValid = false
    errorMessages.push('price must be greater than 0')
  }
  if (!description) {
    isValid = false
    errorMessages.push('description required')
  }

  return {
    isValid,
    errorMessages
  }
}

Product.create = async (payload) => {
  let { description, price } = payload

  // Catch validation error
  let validation = _validate(payload)
  if (!validation.isValid) return Promise.reject(validation.errorMessages)

  // Create new Product and return from DB
  let productId = Products[Products.length - 1].id
  let newId = productId += 1
  let newProduct = {
    id: newId,
    description,
    price
  }
  await Products.push(newProduct)
  let result = await Product.findById(newProduct.id)
  return Promise.resolve(result)
}

Product.find = () => {
  return Promise.resolve(Products)
}

Product.findById = (id) => {
  let product = Products.find(el => el.id === id)
  return Promise.resolve(product)
}

