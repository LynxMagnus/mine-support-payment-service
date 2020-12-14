const joi = require('@hapi/joi')

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string().default('localhost'),
    usePodIdentity: joi.bool().default(false),
    type: joi.string(),
    appInsights: joi.object()
  },
  scheduleSubscription: {
    address: joi.string().default('schedule'),
    username: joi.string(),
    password: joi.string(),
    topic: joi.string()
  },
  paymentSubscription: {
    address: joi.string().default('payment'),
    username: joi.string(),
    password: joi.string(),
    topic: joi.string()
  }
})
const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    usePodIdentity: process.env.NODE_ENV === 'production',
    type: 'subscription',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined
  },
  scheduleSubscription: {
    address: process.env.SCHEDULE_SUBSCRIPTION_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    topic: process.env.SCHEDULE_TOPIC_ADDRESS
  },
  paymentSubscription: {
    address: process.env.PAYMENT_SUBSCRIPTION_ADDRESS,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    topic: process.env.PAYMENT_TOPIC_ADDRESS
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const paymentSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.paymentSubscription }
const scheduleSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.scheduleSubscription }

module.exports = { paymentSubscription, scheduleSubscription }
