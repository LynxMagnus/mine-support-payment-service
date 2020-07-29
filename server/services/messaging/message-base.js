const { ServiceBusClient } = require('@azure/service-bus')

class MessageBase {
  constructor (name, config, credentials, action) {
    this.name = name
    const connectionString = `Endpoint=sb://${config.host}/;SharedAccessKeyName=${config.username};SharedAccessKey=${config.password}`
    this.sbClient = ServiceBusClient.createFromConnectionString(connectionString)
    this.queueClient = this.sbClient.createQueueClient(config.address)
  }

  async closeConnection () {
    await this.sbClient.close()
    console.log(`${this.name} connection closed`)
  }
}

module.exports = MessageBase
