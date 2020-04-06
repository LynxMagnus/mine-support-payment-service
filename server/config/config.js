const Joi = require('@hapi/joi')
const mqConfig = require('./mq-config')
const dbConfig = require('./db-config')
const getOktaConfig = require('./get-okta-config')

// Define config schema
const schema = Joi.object({
  port: Joi.number().default(3004),
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  oktaEnabled: Joi.boolean().default(true)
})

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  oktaEnabled: process.env.OKTA_ENABLED
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
value.isDev = value.env === 'development'
value.isProd = value.env === 'production'

value.scheduleQueueConfig = mqConfig.scheduleQueueConfig
value.paymentQueueConfig = mqConfig.paymentQueueConfig

value.dbConfig = dbConfig
if (value.oktaEnabled) {
  value.okta = getOktaConfig()
}
module.exports = value
