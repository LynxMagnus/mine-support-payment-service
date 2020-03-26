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
      return db.schedule.findAll()
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
