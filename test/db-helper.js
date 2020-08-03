let db = require('../server/models')

async function truncate () {
  db = await db
  await db.payment.destroy({ truncate: true })
  await db.schedule.destroy({ truncate: true })
}

async function createScheduleRecords (schedules) {
  await (await db).schedule.bulkCreate(schedules)
}
async function createPaymentRecords (schedules) {
  await (await db).payment.bulkCreate(schedules)
}

async function close () {
  await (await db).sequelize.close()
}

module.exports = {
  close,
  createScheduleRecords,
  createPaymentRecords,
  truncate
}
