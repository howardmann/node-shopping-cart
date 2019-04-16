let Product = module.exports = {}

const { Products } = require('../db/DB')
const validateProduct = require('./validation/validateProduct')

Product.create = async (payload) => {
  let { description, price } = payload

  // Catch validation error
  let validation = validateProduct(payload)
  if (validation.error) return Promise.reject(validation.error.details)

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



// let payload = {
//   description: 1,
//   price: -1
// }

// Product.create(payload)
//   .then(data => {
//     data
//   })
//   .catch(err => {
//     err
//   })
