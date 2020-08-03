const paymentMapper = require('./payment-mapper')

let db = require('../models')

async function getById (claimId) {
  db = await db
  const payment = await db.payment.findOne({
    where: { claimId: claimId },
    include: [db.schedule]
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
  await (await db).payment.upsert({
    claimId: calculation.claimId,
    value: calculation.value
  })
}

async function getAll () {
  db = await db
  const payments = await db.payment.findAll({ include: [db.schedule] })
  return payments.map(paymentMapper)
}

module.exports = {
  create,
  getAll,
  getById
}
