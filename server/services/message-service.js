const MessageReceiver = require('./messaging/message-receiver')
const scheduleMessageAction = require('./schedule-message-action')
const paymentMessageAction = require('./payment-message-action')
const { scheduleQueueConfig, paymentQueueConfig } = require('../config')

class MessageService {
  async registerReceivers () {
    this.scheduleMessageReceiver = await this.registerReceiver(
      {
        name: 'schedule-queue-receiver',
        config: scheduleQueueConfig,
        action: scheduleMessageAction
      }
    )
    this.paymentMessageReceiver = await this.registerReceiver(
      {
        name: 'payment-queue-receiver',
        config: paymentQueueConfig,
        action: paymentMessageAction
      }
    )
  }

  async registerReceiver ({ name, config, action }) {
    const receiver = new MessageReceiver(name, config)
    await receiver.setupReceiver(action)
    return receiver
  }

  async closeConnections () {
    await this.scheduleMessageReceiver.closeConnection()
    await this.paymentMessageReceiver.closeConnection()
  }
}

module.exports = new MessageService()
