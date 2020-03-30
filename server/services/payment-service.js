const paymentRepository = require('../repository/payment-repository')

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
    const returnValue = payments.map((p) => {
      return {
        claimId: p.claimId,
        paymentAmount: Number.parseFloat(p.value).toFixed(2),
        schedule: p.schedules.map((s) => s.paymentDate)
      }
    })
    return returnValue
  }
}
