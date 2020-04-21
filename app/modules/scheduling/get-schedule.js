const db = require('../../models')
const scheduleMapper = require('./schedule-mapper')

async function getById (claimId) {
  try {
    const schedule = await db.schedule.findAll({
      where: { claimId: claimId },
      include: [db.payment],
      order: [['paymentDate', 'DESC']]
    })
    return schedule.map(scheduleMapper)
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function getAll () {
  try {
    const schedule = await db.schedule.findAll({ include: [db.payment], order: [['paymentDate', 'DESC']] })
    return schedule.map(scheduleMapper)
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = {
  getById,
  getAll
}
