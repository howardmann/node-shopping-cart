const Joi = require('joi')

const schema = Joi.object().keys({
  description: Joi.string().required().error(() => 'custom error message: description must be text'),
  price: Joi.number().min(0.01).required().error(() => 'price must be number greater than min 0.01'),
})

const validateProduct = (payload) => {
  return Joi.validate(payload, schema, {abortEarly: false})
}

// const validateProduct = (payload) => {
//   let {
//     description,
//     price
//   } = payload
//   let errorMessages = []
//   let isValid = true

//   if (!price) {
//     isValid = false
//     errorMessages.push('price is required')
//   }
//   if (price && typeof price !== 'number') {
//     isValid = false
//     errorMessages.push('price must be number')
//   }
//   if (price < 0.01) {
//     isValid = false
//     errorMessages.push('price must be greater than 0')
//   }
//   if (!description) {
//     isValid = false
//     errorMessages.push('description required')
//   }

//   return {
//     isValid,
//     errorMessages
//   }
// }

module.exports = validateProduct


// const result = validateProduct({
//   description: 12
// });
// let x = result.error.details
// x
