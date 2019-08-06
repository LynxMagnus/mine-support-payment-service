const rheaPromise = require('rhea-promise')
const config = require('../config')
const scheduleService = require('./schedule-service')
const connectionService = require('./connection-service')

module.exports = {
  setupConnections: async function () {
    await setupScheduleConnection()
    await setupPaymentConnection()
  }
}

async function setupScheduleConnection () {
  const scheduleConnection = await connectionService.setupConnection(config.messageQueue, config.scheduleQueue)
  await connectionService.openConnection(scheduleConnection)
  const scheduleReceiver = await connectionService.setupReceiver(
    scheduleConnection, 'payment-service-schedule', config.scheduleQueue.address)

  scheduleReceiver.on(rheaPromise.ReceiverEvents.message, (context) => {
    console.log(`message received - schedule - ${context.message.body}`)
    scheduleService.create(JSON.parse(context.message.body))
  })

  process.on('SIGTERM', async function () {
    await connectionService.closeConnection(scheduleConnection)
    process.exit(0)
  })
}

async function setupPaymentConnection () {
  const paymentConnection = await connectionService.setupConnection(config.messageQueue, config.paymentQueue)
  await connectionService.openConnection(paymentConnection)

  const paymentReceiver = await connectionService.setupReceiver(
    paymentConnection, 'payment-service-payment', config.paymentQueue.address)

  paymentReceiver.on(rheaPromise.ReceiverEvents.message, (context) => {
    console.log(`message received - payment - ${context.message.body}`)
    scheduleService.updateValue(JSON.parse(context.message.body))
  })

  process.on('SIGTERM', async function () {
    await connectionService.closeConnection(paymentConnection)
    process.exit(0)
  })
}
