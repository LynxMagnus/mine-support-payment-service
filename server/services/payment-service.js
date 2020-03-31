const paymentRepository = require('../repository/payment-repository')

function paymentMapper (payment) {
  return {
    claimId: payment.claimId,
    paymentAmount: Number.parseFloat(payment.value).toFixed(2),
    schedule: payment.schedules.map((s) => s.paymentDate)
  }
}

module.exports = {
  create: async function (calculation) {
    const existingPayment = await paymentRepository.getById(calculation.claimId)
    if (existingPayment != null) {
      console.log('payment already exists')
      return
    }
    console.log('creating payment')
    await paymentRepository.create(calculation)
  },
  getAll: async function () {
    const payments = await paymentRepository.getAll()
    return payments.map(paymentMapper)
  },
  getById: async function (claimId) {
    const payment = await paymentRepository.getById(claimId)
    return paymentMapper(payment)
  }
}
