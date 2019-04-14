let Products = module.exports = {}

let Product = require('../model/Product')
let serialize = require('./serializers/productSerializer')

Products.list = () => {
  return Product.find()
    .then(data => {
      return serialize(data)
    })
}

Products.find = (id) => {
  return Product.findById(id)
    .then(data => {
      return serialize(data)
    })
}

Products.create = (payload) => {
  let {description, price} = payload
  return Product.create({description, price})
    .then(data => {
      return serialize(data)
    })
}
