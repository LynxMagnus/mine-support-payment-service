const container = require('rhea')
const config = require('../config')
const scheduleService = require('./schedule-service')

module.exports = {
  receiveSchedule: function () {
    const scheduleQueue = 'schedule'
    const valueQueue = 'value'
    const activeMQOptions = {
      transport: config.messageQueuePort === 5672 ? 'tcp' : 'ssl',
      port: config.messageQueuePort,
      reconnect_limit: 10,
      host: config.messageQueue,
      hostname: config.messageQueue,
      username: config.messageQueueUser,
      password: config.messageQueuePass
    }
    container.on('connection_open', (context) => {
      context.connection.open_receiver(valueQueue).on('message', (context) => {
        console.log(`calculation received for payment - ${context.message.body}`)
        scheduleService.updateValue(JSON.parse(context.message.body))
        context.delivery.release({ undeliverable_here: true })
      })
      context.connection.open_receiver(scheduleQueue).on('message', (context) => {
        console.log(`claim received for scheduling - ${context.message.body}`)
        scheduleService.create(JSON.parse(context.message.body))
        context.delivery.release({ undeliverable_here: true })
      })
    })
    container.connect(activeMQOptions)
  }
}
