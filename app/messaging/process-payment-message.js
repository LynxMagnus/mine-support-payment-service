const { createPayment } = require('../payment')

async function processPaymentMessage (message) {
  try {
    await createPayment(message.body)
    await message.complete()
  } catch (err) {
    console.error('Unable to process message:', err)
    await message.abandon()
  }
}

module.exports = processPaymentMessage
