const joi = require('@hapi/joi')

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string().default('localhost'),
    usePodIdentity: joi.bool().default(false),
    type: joi.string()
  },
  scheduleQueue: {
    address: joi.string().default('schedule'),
    username: joi.string(),
    password: joi.string()
  },
  paymentQueue: {
    address: joi.string().default('payment'),
    username: joi.string(),
    password: joi.string()
  }
})
const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    usePodIdentity: process.env.NODE_ENV === 'production',
    type: 'queue'
  },
  scheduleQueue: {
    address: process.env.SCHEDULE_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  },
  paymentQueue: {
    address: process.env.PAYMENT_QUEUE_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const paymentQueue = { ...mqResult.value.messageQueue, ...mqResult.value.paymentQueue }
const scheduleQueue = { ...mqResult.value.messageQueue, ...mqResult.value.scheduleQueue }

module.exports = { paymentQueue, scheduleQueue }
