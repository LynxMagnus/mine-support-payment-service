const paymentService = require('../services/payment-service')

async function getPayment (request, h) {
  const payment = await paymentService.getById(request.params.claimId)
  return h.response(payment).code(200)
}

async function getPayments (request, h) {
  const schedules = await paymentService.getAll()
  return h.response(schedules).code(200)
}

module.exports = {
  getPayment,
  getPayments
}
