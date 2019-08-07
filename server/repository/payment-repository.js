const db = require('../models')

module.exports = {
  getById: async function (claimId) {
    try {
      return db.payment.findOne({
        where: {
          claimId: claimId
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
  create: async function (calculation) {
    try {
      const calculationRecord = await db.payment.upsert({
        claimId: calculation.claimId,
        value: calculation.value
      })

      return calculationRecord
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
