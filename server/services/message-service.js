const auth = require('@azure/ms-rest-nodeauth')
const MessageReceiver = require('./messaging/message-receiver')
const scheduleMessageAction = require('./schedule-message-action')
const paymentMessageAction = require('./payment-message-action')
const { isProd, paymentQueue, scheduleQueue } = require('../config')

class MessageService {
  constructor (credentials) {
    const paymentAction = payment => paymentMessageAction(payment)
    this.paymentMessageReceiver = new MessageReceiver('payment-queue-receiver', paymentQueue, credentials, paymentAction)
    const scheduleAction = claim => scheduleMessageAction(claim)
    this.scheduleMessageReceiver = new MessageReceiver('schedule-queue-receiver', scheduleQueue, credentials, scheduleAction)
  }

  async closeConnections () {
    await this.paymentMessageReceiver.closeConnection()
    await this.scheduleMessageReceiver.closeConnection()
  }
}

module.exports = async function () {
  const credentials = isProd ? await auth.loginWithVmMSI({ resource: 'https://servicebus.azure.net' }) : undefined
  return new MessageService(credentials)
}
