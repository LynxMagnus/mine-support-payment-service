const Joi = require('@hapi/joi')

function getB2cConfig () {
// Define config schema
  const schema = Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    b2cUrl: Joi.string().required(),
    scopes: Joi.array().items(Joi.string()).required()
  })

  // Build config
  const b2cConfig = {
    clientId: process.env.B2C_CLIENT_ID,
    clientSecret: process.env.B2C_CLIENT_SECRET,
    b2cUrl: process.env.B2C_URL,
    scopes: ['ffc-demo.payments.read', 'ffc-demo.payments.read.self']
  }
  // Validate config
  const result = schema.validate(b2cConfig, {
    abortEarly: false
  })

  // Throw if config is invalid
  if (result.error) {
    throw new Error(`The b2c config is invalid. ${result.error.message}`)
  }
  return result.value
}

module.exports = getB2cConfig
