const Joi = require('@hapi/joi')
const mqConfig = require('./mq-config')
const dbConfig = require('./database-config')
const { development, production, test } = require('./constants').environments

const getOktaConfig = require('./get-okta-config')
const getB2cConfig = require('./get-b2c-config')

// Define config schema
const schema = Joi.object({
  port: Joi.number().default(3004),
  env: Joi.string().valid(development, test, production).default(development),
  oidcProvider: Joi.string().default('dev').lowercase()
})

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  oidcProvider: process.env.OIDC_PROVIDER
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === development
value.isProd = value.env === production

value.scheduleSubscription = mqConfig.scheduleSubscription
value.paymentSubscription = mqConfig.paymentSubscription

value.dbConfig = dbConfig
if (value.oidcProvider === 'okta') {
  value.okta = getOktaConfig()
}
if (value.oidcProvider === 'b2c') {
  value.b2c = getB2cConfig()
}
module.exports = value
