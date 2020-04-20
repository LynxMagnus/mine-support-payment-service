const joi = require('@hapi/joi')

const queueSchema = joi.object({
  name: joi.string().required(),
  endpoint: joi.string().required(),
  queueUrl: joi.string().required(),
  region: joi.string().default('eu-west-2'),
  accessKeyId: joi.string().optional(),
  secretAccessKey: joi.string().optional(),
  createQueue: joi.bool().default(false)
})

const mqSchema = joi.object({
  scheduleQueueConfig: queueSchema,
  paymentQueueConfig: queueSchema
})

const mqConfig = {
  scheduleQueueConfig: {
    name: process.env.SCHEDULE_QUEUE_NAME,
    endpoint: process.env.SCHEDULE_ENDPOINT,
    queueUrl: process.env.SCHEDULE_QUEUE_URL || `${process.env.SCHEDULE_ENDPOINT}/${process.env.SCHEDULE_QUEUE_NAME}`,
    region: process.env.SCHEDULE_QUEUE_REGION,
    accessKeyId: process.env.DEV_ACCESS_KEY_ID,
    secretAccessKey: process.env.DEV_ACCESS_KEY,
    createQueue: process.env.CREATE_SCHEDULE_QUEUE
  },
  paymentQueueConfig: {
    name: process.env.PAYMENT_QUEUE_NAME,
    endpoint: process.env.PAYMENT_ENDPOINT,
    queueUrl: process.env.PAYMENT_QUEUE_URL || `${process.env.PAYMENT_ENDPOINT}/${process.env.PAYMENT_QUEUE_NAME}`,
    region: process.env.PAYMENT_QUEUE_REGION,
    accessKeyId: process.env.DEV_ACCESS_KEY_ID,
    secretAccessKey: process.env.DEV_ACCESS_KEY,
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

module.exports = mqResult.value
