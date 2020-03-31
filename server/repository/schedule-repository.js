const db = require('../models')

module.exports = {
  getById: async function (claimId) {
    try {
      return db.schedule.findAll({
        where: {
          claimId: claimId
        },
        include: [
          db.payment
        ],
        order: [
          ['paymentDate', 'DESC']
        ]
      })
    } catch (err) {
      console.log(err)
    }
  },
  getAll: async function () {
    try {
      return await db.schedule.findAll({ include: [db.payment], order: [['paymentDate', 'DESC']] })
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
