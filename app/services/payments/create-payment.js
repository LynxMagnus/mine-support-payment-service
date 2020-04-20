const db = require('../../models')

async function createPayment (calculation) {
  try {
    await db.payment.upsert({
      claimId: calculation.claimId,
      value: calculation.value
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = createPayment
