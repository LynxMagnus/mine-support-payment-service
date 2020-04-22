const paymentService = require('./payment-service')

async function paymentMessageAction (message) {
  try {
    console.log('message received - payment ', message.Body)
    const payment = JSON.parse(message.Body)
    await paymentService.create(payment)
  } catch (err) {
    console.error('unable to process message', err)
    throw err
  }
}

module.exports = { paymentMessageAction }
