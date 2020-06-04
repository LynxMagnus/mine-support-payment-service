const MessageReceiver = require('./messaging/message-receiver')
const scheduleMessageAction = require('./schedule-message-action')
const paymentMessageAction = require('./payment-message-action')
const config = require('../config')

class MessageService {
  async registerReceivers () {
    this.scheduleMessageReceiver = await this.registerReceiver(
      {
        name: 'schedule-queue-receiver',
        config: config.scheduleQueueConfig,
        action: scheduleMessageAction
      }
    )
    this.paymentMessageReceiver = await this.registerReceiver(
      {
        name: 'payment-queue-receiver',
        config: config.paymentQueueConfig,
        action: paymentMessageAction
      }
    )
  }

  async registerReceiver ({ name, config, action }) {
    const receiver = new MessageReceiver(name, config)
    await receiver.openConnection()
    await receiver.setupReceiver(action)
    return receiver
  }

  async closeConnections () {
    await this.scheduleMessageReceiver.closeConnection()
    await this.paymentMessageReceiver.closeConnection()
  }

  isRunning () {
    return this.scheduleMessageReceiver &&
    this.scheduleMessageReceiver.isConnected() &&
    this.paymentMessageReceiver &&
     this.paymentMessageReceiver.isConnected()
  }
}

module.exports = new MessageService()
