const joi = require('joi')

// Define config schema
const schema = {
  port: joi.number().default(3004),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  messageQueue: {
    host: joi.string().default('localhost'),
    valueAddress: joi.string().default('value'),
    scheduleAddress: joi.string().default('schedule'),
    transport: joi.string().default('tcp'),
    user: joi.string(),
    password: joi.string(),
    port: joi.number().default(5672),
    reconnectLimit: joi.number().default(10)
  }
}

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  messageQueue: {
    host: process.env.MINE_SUPPORT_MESSAGE_QUEUE_HOST,
    valueAddress: process.env.MINE_SUPPORT_MESSAGE_QUEUE_VALUE_ADDRESS,
    scheduleAddress: process.env.MINE_SUPPORT_MESSAGE_QUEUE_SCHEDULE_ADDRESS,
    transport: process.env.MINE_SUPPORT_MESSAGE_QUEUE_TRANSPORT,
    user: process.env.MINE_SUPPORT_MESSAGE_QUEUE_USER,
    password: process.env.MINE_SUPPORT_MESSAGE_QUEUE_PASSWORD,
    port: process.env.MINE_SUPPORT_MESSAGE_QUEUE_PORT,
    reconnectLimit: process.env.MINE_SUPPORT_MESSAGE_QUEUE_RECONNECT_LIMIT
  }
}

// Validate config
const result = joi.validate(config, schema, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'development'
value.isProd = value.env === 'production'

module.exports = value
