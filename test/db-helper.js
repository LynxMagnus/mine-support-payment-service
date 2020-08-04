const models = require('../server/models')

async function truncate () {
  await models.payment.destroy({ truncate: true })
  await models.schedule.destroy({ truncate: true })
}

async function createScheduleRecords (schedules) {
  await models.schedule.bulkCreate(schedules)
}

async function createPaymentRecords (schedules) {
  await models.payment.bulkCreate(schedules)
}

async function close () {
  await models.sequelize.close()
}

module.exports = {
  close,
  createScheduleRecords,
  createPaymentRecords,
  truncate
}
