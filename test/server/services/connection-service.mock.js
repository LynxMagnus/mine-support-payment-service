const EventEmitter = require('events')

module.exports = {
  setupConnection: async function (hostConfig, queueConfig) {
    return {}
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
    return new EventEmitter()
  },
  openConnection: async function (connection) {
  },
  closeConnection: async function (connection) {
  }
}
