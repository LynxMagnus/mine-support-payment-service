/**
 *
 *   this file is used for manual testing of the service.
 *   The script './scripts/send-test-message' will execute the code
 *   in the running container to send a message to the source queue
 *
**/
const MessageSender = require('../server/services/messaging/message-sender')
const config = require('../server/config')

const paymentMessage = {
  claimId: 'MINE124',
  value: 190.96
}

async function sendMessage (queueConfig, message) {
  const sender = new MessageSender(
    `test-${queueConfig.address}-sender`,
    queueConfig
  )
  const delivery = await sender.sendMessage(message)
  await sender.closeConnection()

  return delivery
}

sendMessage(config.paymentQueue, paymentMessage)
  .then((delivery) => console.debug('Message sent:', delivery))
  .catch((ex) => {
    console.error('Failed to send message')
    console.error(ex)
    process.exitCode = 1
  })
  .finally(() => process.exit())
