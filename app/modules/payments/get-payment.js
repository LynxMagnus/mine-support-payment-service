const db = require('../../models')
const paymentMapper = require('./payment-mapper')

async function getById (claimId) {
  try {
    const payment = await db.payment.findOne({
      where: { claimId: claimId },
      include: [db.schedule]
    })
    return paymentMapper(payment)
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function getAll () {
  try {
    const payments = await db.payment.findAll({ include: [db.schedule] })
    return payments.map(paymentMapper)
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = {
  getById,
  getAll
}
