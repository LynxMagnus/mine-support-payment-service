const { ReceiveMode, ServiceBusClient } = require('@azure/service-bus')
const config = require('../app/config/mq-config')

// When calling this within a test script, ensure there is a generous timeout
// for the connections to complete within, `30000` should be enough.
async function clearSubscription (subscriptionName) {
  // There are three queues with potentially three different hosts and
  // credentials, however, atm there is only the single instance. KIS.
  let sbClient
  try {
    const connectionString = `Endpoint=sb://${config.paymentSubscription.host}/;SharedAccessKeyName=${config.paymentSubscription.username};SharedAccessKey=${config.paymentSubscription.password}`
    sbClient = ServiceBusClient.createFromConnectionString(connectionString)

    const subscriptionAddress = config[subscriptionName].address
    const queueClient = sbClient.createSubscriptionClient(subscriptionAddress, config[subscriptionName].topic)
    const receiver = queueClient.createReceiver(ReceiveMode.receiveAndDelete)
    console.log(`Setup to receive messages from '${subscriptionAddress}'.`)

    const batchSize = 10
    let counter = 1
    let messages
    do {
      console.log(`Receiving messages, batch ${counter}.`)
      messages = await receiver.receiveMessages(batchSize, 5)
      console.log(`Received (and deleted) ${messages.length} messages.`)
      counter++
    } while (messages.length > 0 && messages.length === batchSize)

    console.log(`No more messages in: '${subscriptionAddress}'.`)
    await queueClient.close()
  } catch (err) {
    console.log(err)
    throw err
  } finally {
    await sbClient.close()
  }
}

async function clearAllSubscriptions () {
  await clearSubscription('paymentSubscription')
  await clearSubscription('scheduleSubscription')
}

module.exports = {
  clearAllSubscriptions,
  clearSubscription
}
