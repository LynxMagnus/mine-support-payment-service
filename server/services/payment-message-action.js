const paymentService = require('./payment-service')

async function paymentMessageAction (payment) {
  try {
    await paymentService.create(payment)
  } catch (err) {
    console.error('unable to process message', err)
    throw err
  }
}

module.exports = paymentMessageAction
