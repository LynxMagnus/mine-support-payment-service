const rheaPromise = require('rhea-promise')

module.exports = {
  setupConnection: async function (hostConfig, queueConfig) {
    const connectionOptions = this.configureMQ(hostConfig, queueConfig)
    const connection = new rheaPromise.Connection(connectionOptions)
    return connection
  },
  configureMQ: function (hostConfig, queueConfig) {
    return {
      host: hostConfig.host,
      port: hostConfig.port,
      transport: hostConfig.transport,
      reconnect_limit: hostConfig.reconnectLimit,
      username: queueConfig.user,
      password: queueConfig.password
    }
  },
  setupReceiver: async function (connection, name, address) {
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
    receiver.on(rheaPromise.ReceiverEvents.receiverError, (context) => {
      const receiverError = context.receiver && context.receiver.error
      if (receiverError) {
        console.log(`receipt error for ${name} receiver - ${receiverError}`)
      }
    })
    return receiver
  },
  openConnection: async function (connection) {
    try {
      await connection.open()
    } catch (err) {
      console.log(`unable to connect to message queue - ${err}`)
    }
  },
  closeConnection: async function (connection) {
    try {
      connection.close()
    } catch (err) {
      console.log(`unable to close connection - ${err}`)
    }
  }
}
