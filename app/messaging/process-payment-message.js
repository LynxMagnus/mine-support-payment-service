const { createPayment } = require('../payment')
const sendEvent = require('../events')

async function processPaymentMessage (message, receiver) {
  try {
    await createPayment(message.body)
    await receiver.completeMessage(message)
    await sendEvent(message.body, 'uk.gov.demo.claim.payment.attached')
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processPaymentMessage
