const { getPaymentDates } = require('./scheduler')
const db = require('../../models')

async function create (claim, startDate) {
  const paymentDates = getPaymentDates(startDate)

  for (let i = 0; i < paymentDates.length; i++) {
    try {
      await db.schedule.upsert({
        claimId: claim.claimId,
        paymentDate: paymentDates[i]
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = create
