const { createPayment } = require('../payment')

async function processPaymentMessage (message, receiver) {
  try {
    await createPayment(message.body)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processPaymentMessage
