const Joi = require('joi')

const schemaCreate = Joi.object().keys({
  product_id: Joi.number().required(),
  cart_id: Joi.number().required(),
  quantity: Joi.number().min(1).required()
})

const schemaUpdate = Joi.object().keys({
  product_id: Joi.number(),
  cart_id: Joi.number(),
  quantity: Joi.number().min(1)
})

const validateLineItemCreate = (payload) => {
  return Joi.validate(payload, schemaCreate, {
    abortEarly: false
  })
}

const validateLineItemUpdate = (payload) => {
  return Joi.validate(payload, schemaUpdate, {
    abortEarly: false
  })
}


module.exports = { validateLineItemCreate, validateLineItemUpdate }


