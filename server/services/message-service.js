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
  console.log('schedule connection open')

  const scheduleReceiver = await connectionService.setupReceiver(
    scheduleConnection, 'schedule', config.scheduleQueue.address)
  console.log('schedule receiver listening')

  scheduleReceiver.on(rheaPromise.ReceiverEvents.message, async (context) => {
    try {
      console.log('message received - schedule', context.message.body)
      const message = JSON.parse(context.message.body)
      await scheduleService.create(message)
    } catch (ex) {
      console.error('unable to process message', ex)
    }
  })
}

async function setupPaymentConnection () {
  const paymentConnection = await connectionService.setupConnection(config.messageQueue, config.paymentQueue)
  await connectionService.openConnection(paymentConnection)
  console.log('payment connection open')

  const paymentReceiver = await connectionService.setupReceiver(
    paymentConnection, 'payment', config.paymentQueue.address)
  console.log('payment receiver listening')

  paymentReceiver.on(rheaPromise.ReceiverEvents.message, async (context) => {
    try {
      console.log('message received - payment', context.message.body)
      const message = JSON.parse(context.message.body)
      await paymentService.create(message)
    } catch (ex) {
      console.error('unable to process message', ex)
    }
  })
}
