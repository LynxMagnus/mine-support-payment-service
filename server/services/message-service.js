const rheaPromise = require('rhea-promise')
const config = require('../config')
const scheduleService = require('./schedule-service')
const paymentService = require('./payment-service')
const connectionService = require('./connection-service')

module.exports = {
  setupConnections: async function () {
    try {
      await setupScheduleConnection()
      await setupPaymentConnection()
    } catch (err) {
      console.log('unable to connect to message queue', err)
    }
  }
}

async function setupScheduleConnection () {
  const scheduleConnection = await connectionService.setupConnection(config.messageQueue, config.scheduleQueue)
  await connectionService.openConnection(scheduleConnection)
  const scheduleReceiver = await connectionService.setupReceiver(
    scheduleConnection, 'schedule', config.scheduleQueue.address)

  scheduleReceiver.on(rheaPromise.ReceiverEvents.message, (context) => {
    const message = JSON.parse(context.message.body)
    console.log(`message received - schedule - ${message}`)
    scheduleService.create(message)
  })
}

async function setupPaymentConnection () {
  const paymentConnection = await connectionService.setupConnection(config.messageQueue, config.paymentQueue)
  await connectionService.openConnection(paymentConnection)

  const paymentReceiver = await connectionService.setupReceiver(
    paymentConnection, 'payment', config.paymentQueue.address)

  paymentReceiver.on(rheaPromise.ReceiverEvents.message, (context) => {
    const message = JSON.parse(context.message.body)
    console.log(`message received - payment - ${message}`)
    paymentService.create(message)
  })
}
