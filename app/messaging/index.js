const config = require('../config')
const processScheduleMessage = require('./process-schedule-message')
const processPaymentMessage = require('./process-payment-message')
const { MessageReceiver } = require('ffc-messaging')
let scheduleReceiver
let paymentReceiver

async function start () {
  scheduleReceiver = new MessageReceiver(config.scheduleQueue, processScheduleMessage)
  await scheduleReceiver.connect()
  paymentReceiver = new MessageReceiver(config.paymentQueue, processPaymentMessage)
  await paymentReceiver.connect()
  console.info('Ready to receive messages')
}

async function stop () {
  await scheduleReceiver.closeConnection()
  await paymentReceiver.closeConnection()
}

module.exports = { start, stop }
