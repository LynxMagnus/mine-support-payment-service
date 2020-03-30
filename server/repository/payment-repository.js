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
  getAll: async function () {
    try {
      const payments = await db.payment.findAll({ include: [db.schedule] })
      const returnValue = payments.map((p) => {
        return {
          claimId: p.claimId,
          paymentAmount: Number.parseFloat(p.value).toFixed(2),
          schedule: p.schedules.map((s) => s.paymentDate)
        }
      })
      return returnValue
    } catch (err) {
      console.log(err)
      throw err
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
