const rheaPromise = require('rhea-promise')
const config = require('../config')
const scheduleService = require('./schedule-service')

module.exports = {
  setupReceivers: async function (messageQueueOptions) {
    const connectionOptions = configureMQ(messageQueueOptions || config.messageQueue)
    const connection = new rheaPromise.Connection(connectionOptions)

    try {
      console.log('opening connection')
      await connection.open()
    } catch (err) {
      console.log(`unable to connect to message queue ${err}`)
    }

    Promise.all([
      setupReceiver(connection, 'payment-service-schedule', config.messageQueue.scheduleAddress),
      setupReceiver(connection, 'payment-service-value', config.messageQueue.valueAddress)
    ])

    process.on('SIGTERM', async function () {
      console.log('closing connection')
      await connection.close()
      process.exit(0)
    })
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

async function setupReceiver (connection, name, address) {
  const receiverOptions = {
    name: name,
    source: {
      address
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error
      if (sessionError) {
        console.log(`session error for ${name} receiver - ${sessionError}`)
      }
    }
  }
  const receiver = await connection.createReceiver(receiverOptions)
  receiver.on(rheaPromise.ReceiverEvents.message, (context) => {
    console.log(`message received - ${name} - ${context.message.body}`)
    scheduleService.create(JSON.parse(context.message.body))
  })
  receiver.on(rheaPromise.ReceiverEvents.receiverError, (context) => {
    const receiverError = context.receiver && context.receiver.error
    if (receiverError) {
      console.log(`receipt error for ${name} receiver - ${receiverError}`)
    }
  })
}
