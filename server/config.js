const Joi = require('@hapi/joi')

// Define config schema
const schema = Joi.object({
  port: Joi.number().default(3004),
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  messageQueue: {
    host: Joi.string().default('localhost'),
    hostname: Joi.string().default('localhost'),
    port: Joi.number().default(5672),
    reconnectLimit: Joi.number().default(10),
    transport: Joi.string().default('tcp')
  },
  scheduleQueue: {
    address: Joi.string().default('schedule'),
    user: Joi.string(),
    password: Joi.string()
  },
  paymentQueue: {
    address: Joi.string().default('payment'),
    user: Joi.string(),
    password: Joi.string()
  }
})

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

module.exports = value
