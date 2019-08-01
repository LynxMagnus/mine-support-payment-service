const rheaPromise = require('rhea-promise')
const config = require('../config')
const scheduleService = require('./schedule-service')

module.exports = {
  setupReceivers: async function (messageQueueOptions) {
    const connectionOptions = configureMQ(messageQueueOptions || config.messageQueue)
    const connection = new rheaPromise.Connection(connectionOptions)

    try {
      await connection.open()
      connection.then(function () {
        Promise.all([setupScheduleReceiver(connection), setupValueReceiver(connection)])
      })
    } catch (err) {
      console.log(`unable to connect to message queue ${err}`)
    }
  }
}

function configureMQ (options) {
  return {
    transport: options.transport,
    host: options.host,
    username: options.user,
    password: options.password,
    port: options.port,
    reconnect_limit: options.reconnectLimit
  }
}

async function setupScheduleReceiver (connection) {
  const receiverOptions = {
    name: 'payment-service-schedule',
    source: {
      address: config.messageQueue.scheduleAddress
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error
      if (sessionError) {
        console.log(`session error for schedule receiver - ${sessionError}`)
      }
    }
  }
  const receiver = await connection.createReceiver(receiverOptions)
  receiver.on(rheaPromise.ReceiverEvents.message, (context) => {
    console.log(`claim received for scheduling - ${context.message.body}`)
    scheduleService.create(JSON.parse(context.message.body))
  })
  receiver.on(rheaPromise.ReceiverEvents.receiverError, (context) => {
    const receiverError = context.receiver && context.receiver.error
    if (receiverError) {
      console.log(`receipt error for schedule receiver - ${receiverError}`)
    }
  })
}

async function setupValueReceiver (connection) {
  const receiverOptions = {
    name: 'payment-service-value',
    source: {
      address: config.messageQueue.valueAddress
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error
      if (sessionError) {
        console.log(`session error for value receiver - ${sessionError}`)
      }
    }
  }

  const receiver = await connection.createReceiver(receiverOptions)
  receiver.on(rheaPromise.ReceiverEvents.message, (context) => {
    console.log(`calculation received for payment - ${context.message.body}`)
    scheduleService.updateValue(JSON.parse(context.message.body))
  })
  receiver.on(rheaPromise.ReceiverEvents.receiverError, (context) => {
    const receiverError = context.receiver && context.receiver.error
    if (receiverError) {
      console.log(`receipt error for value receiver - ${receiverError}`)
    }
  })
}
