const joi = require('@hapi/joi')

// Define config schema
const schema = {
  port: joi.number().default(3004),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  messageQueue: {
    host: joi.string().default('localhost'),
    hostname: joi.string().default('localhost'),
    port: joi.number().default(5672),
    reconnectLimit: joi.number().default(10),
    transport: joi.string().default('tcp')
  },
  scheduleQueue: {
    address: joi.string().default('schedule'),
    user: joi.string(),
    password: joi.string()
  },
  paymentQueue: {
    address: joi.string().default('payment'),
    user: joi.string(),
    password: joi.string()
  }
}

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    hostname: process.env.MESSAGE_QUEUE_HOST,
    port: process.env.MESSAGE_QUEUE_PORT,
    reconnectLimit: process.env.MESSAGE_QUEUE_RECONNECT_LIMIT,
    transport: process.env.MESSAGE_QUEUE_TRANSPORT
  },
  scheduleQueue: {
    address: process.env.SCHEDULE_QUEUE_ADDRESS,
    user: process.env.SCHEDULE_QUEUE_USER,
    password: process.env.SCHEDULE_QUEUE_PASSWORD
  },
  paymentQueue: {
    address: process.env.PAYMENT_QUEUE_ADDRESS,
    user: process.env.PAYMENT_QUEUE_USER,
    password: process.env.PAYMENT_QUEUE_PASSWORD
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
