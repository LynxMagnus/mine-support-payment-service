const auth = require('@azure/ms-rest-nodeauth')
const MessageReceiver = require('./messaging/message-receiver')
const scheduleMessageAction = require('./schedule-message-action')
const paymentMessageAction = require('./payment-message-action')
const { isProd, paymentQueueConfig, scheduleQueueConfig } = require('../config')

process.on('SIGTERM', function () {
  messageService.closeConnections()
  process.exit(0)
})

process.on('SIGINT', function () {
  messageService.closeConnections()
  process.exit(0)
})

class MessageService {
  constructor (credentials) {
    this.closeConnections = this.closeConnections.bind(this)
    const paymentAction = payment => { paymentMessageAction(payment) }
    this.paymentMessageReceiver = new MessageReceiver('payment-queue-receiver', paymentQueueConfig, credentials, paymentAction)
    const scheduleAction = claim => { scheduleMessageAction(claim) }
    this.scheduleMessageReceiver = new MessageReceiver('schedule-queue-receiver', scheduleQueueConfig, credentials, scheduleAction)
  }

  async closeConnections () {
    await this.scheduleMessageReceiver.closeConnection()
    await this.paymentMessageReceiver.closeConnection()
  }
}

let messageService

module.exports = (async function createConnections () {
  const credentials = isProd ? await auth.loginWithVmMSI({ resource: 'https://servicebus.azure.net' }) : undefined
  messageService = new MessageService(credentials)
  return messageService
}())
