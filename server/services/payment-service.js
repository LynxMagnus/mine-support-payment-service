const paymentRepository = require('../repository/payment-repository')

module.exports = {
  create: async function (calculation) {
    const existingPayment = await paymentRepository.getById(calculation.claimId)
    if (existingPayment != null) {
      console.log('payment already exists')
      return
    }
    await paymentRepository.create(calculation)
  }
}
