const { createPayment } = require('../payment')
const sendEvent = require('../events')

async function processPaymentMessage (message, receiver) {
  try {
    await createPayment(message.body)
    await sendEvent(message.body, 'uk.gov.demo.claim.payment.attached')
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process message:', err)
    await receiver.abandonMessage(message)
  }
}

module.exports = processPaymentMessage
