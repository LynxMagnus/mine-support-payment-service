const db = require('../models')

module.exports = {
  getById: async function (claimId) {
    try {
      return db.schedule.findAll({
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
      const schedule = await db.schedule.findAll({ include: [db.payment] })
      return schedule.map((s) => {
        return {
          claimId: s.claimId,
          paymentAmount: s.payment ? Number.parseFloat(s.payment.value).toFixed(2) : null,
          paymentDate: s.paymentDate
        }
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  create: async function (schedule) {
    try {
      const scheduleRecord = await db.schedule.upsert({
        claimId: schedule.claimId,
        paymentDate: schedule.paymentDate
      })

      return scheduleRecord
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
