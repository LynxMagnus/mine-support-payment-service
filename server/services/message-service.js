const amqp = require('amqplib/callback_api')
const scheduleService = require('./schedule-service')
const config = require('../config')

module.exports = {
  receiveSchedule: function () {
    const messageQueue = config.messageQueue
    amqp.connect(messageQueue, function (err, conn) {
      if (err) {
        console.log(err)
      }
      conn.createChannel(function (err, ch) {
        if (err) {
          console.log(err)
        }

        const scheduleQueue = 'schedule'
        ch.assertQueue(scheduleQueue, { durable: false })
        console.log('waiting for new claims')

        ch.consume(scheduleQueue, function (msg) {
          console.log(`claim received for scheduling - ${msg.content.toString()}`)
          scheduleService.create(JSON.parse(msg.content))
        }, { noAck: true })

        const valueQueue = 'value'
        ch.assertQueue(valueQueue, { durable: false })
        console.log('waiting for new calculation')

        ch.consume(valueQueue, function (msg) {
          console.log(`calculation received for payment - ${msg.content.toString()}`)
          scheduleService.updateValue(JSON.parse(msg.content))
        }, { noAck: true })
      })
    })
  }
}
