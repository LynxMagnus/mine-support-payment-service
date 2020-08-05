const paymentMapper = require('./payment-mapper')

const models = require('../services/database-service').models

async function getById (claimId) {
  const payment = await models.payment.findOne({
    where: { claimId: claimId },
    include: [models.schedule]
  })
  return payment ? paymentMapper(payment) : undefined
}

async function create (calculation) {
  const existingPayment = await getById(calculation.claimId)
  if (existingPayment != null) {
    console.log('payment already exists')
    return
  }
  console.log('creating payment')
  await (await models).payment.upsert({
    claimId: calculation.claimId,
    value: calculation.value
  })
}

async function getAll () {
  const payments = await models.payment.findAll({ include: [models.schedule] })
  return payments.map(paymentMapper)
}

module.exports = {
  create,
  getAll,
  getById
}
