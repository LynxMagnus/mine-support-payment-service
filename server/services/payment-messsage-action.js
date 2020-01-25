const paymentService = require('./payment-service')

async function messageAction (message) {
  try {
    console.log('message received - payment ', message.Body)
    const payment = JSON.parse(message.Body)
    await paymentService.create(payment)
  } catch (ex) {
    console.error('unable to process message', ex)
  }
}

module.exports = { messageAction }
