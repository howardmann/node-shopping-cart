const Joi = require('joi')

const schema = Joi.object().keys({
  product_id: Joi.number().required(),
  quantity: Joi.number().min(1).required()
})

const validateLineItem = (payload) => {
  return Joi.validate(payload, schema, {
    abortEarly: false
  })
}

module.exports = validateLineItem


