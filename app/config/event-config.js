const joi = require('joi')

const schema = joi.object({
  name: joi.string().default('ffc-demo-payment-service-claim-update'),
  host: joi.string().default('localhost'),
  port: joi.string().default(9093),
  authentication: joi.string().default('password'),
  username: joi.string(),
  password: joi.string(),
  mechanism: joi.string().default('scram-sha-512'),
  topic: joi.string().default('ffc-demo-claim-update'),
  clientId: joi.string().default('ffc-demo-payment-service'),
  consumerGroupId: joi.string().default('ffc-demo-payment-service-claim-update'),
  fromBeginning: joi.bool().default(true),
  appInsights: joi.object(),
  routingKey: joi.string().allow('')

})

const config = {
  name: process.env.CLAIM_UPDATE_TOPIC_NAME,
  host: process.env.EVENT_HOST,
  port: process.env.EVENT_PORT,
  authentication: process.env.NODE_ENV === 'production' ? 'token' : 'password',
  username: process.env.EVENT_USERNAME,
  password: process.env.EVENT_PASSWORD,
  mechanism: process.env.EVENT_MECHANISM,
  topic: process.env.CLAIM_UPDATE_TOPIC,
  clientId: process.env.EVENT_CLIENT_ID,
  consumerGroupId: process.env.EVENT_CONSUMER_GROUP_ID,
  fromBeginning: process.env.CLAIM_UPDATE_FROM_BEGINNING,
  appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined,
  routingKey: process.env.EVENT_ROUTING_KEY
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

const value = result.value

module.exports = value
