
const db = require('../../../server/models')

async function truncate () {
  await db.payment.destroy({ truncate: true })
  await db.schedule.destroy({ truncate: true })
}

async function createScheduleRecords (schedules) {
  await db.schedule.bulkCreate(schedules)
}
async function createPaymentRecords (schedules) {
  await db.payment.bulkCreate(schedules)
}

module.exports = {
  truncate,
  createScheduleRecords,
  createPaymentRecords
}
