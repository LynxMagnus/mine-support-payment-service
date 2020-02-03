const joi = require('@hapi/joi')

const mqSchema = joi.object({
  scheduleQueue: {
    name: joi.string().default('schedule'),
    // endpoint: joi.string().default('http://localhost:9324'),
    queueUrl: joi.string().default('http://localhost:9324/queue/schedule'),
    region: joi.string().default('eu-west-2'),
    // accessKeyId: joi.string(),
    // secretAccessKey: joi.string(),
    createQueue: joi.bool().default(true)
  },
  paymentQueue: {
    name: joi.string().default('payment'),
    // endpoint: joi.string().default('http://localhost:9324'),
    queueUrl: joi.string().default('http://localhost:9324/queue/payment'),
    region: joi.string().default('eu-west-2'),
    // accessKeyId: joi.string(),
    // secretAccessKey: joi.string(),
    createQueue: joi.bool().default(true)
  }
})

const mqConfig = {
  scheduleQueue: {
    name: process.env.SCHEDULE_QUEUE_NAME,
    // endpoint: process.env.SCHEDULE_ENDPOINT,
    queueUrl: process.env.SCHEDULE_QUEUE_URL,
    region: process.env.SCHEDULE_QUEUE_REGION,
    // accessKeyId: process.env.SCHEDULE_QUEUE_ACCESS_KEY_ID,
    // secretAccessKey: process.env.SCHEDULE_QUEUE_ACCESS_KEY,
    createQueue: process.env.CREATE_SCHEDULE_QUEUE
  },
  paymentQueue: {
    name: process.env.PAYMENT_QUEUE_NAME,
    // endpoint: process.env.PAYMENT_ENDPOINT,
    queueUrl: process.env.PAYMENT_QUEUE_URL,
    region: process.env.PAYMENT_QUEUE_REGION,
    // accessKeyId: process.env.PAYMENT_QUEUE_ACCESS_KEY_ID,
    // secretAccessKey: process.env.PAYMENT_QUEUE_ACCESS_KEY,
    createQueue: process.env.CREATE_PAYMENT_QUEUE
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const scheduleQueueConfig = { ...mqResult.value.scheduleQueue }
const paymentQueueConfig = { ...mqResult.value.paymentQueue }

module.exports = { paymentQueueConfig, scheduleQueueConfig }
