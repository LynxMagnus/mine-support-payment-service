const db = require('../models')

const { getPaymentDates } = require('./scheduler')

function scheduleMapper (schedule) {
  const payment = {
    claimId: schedule.claimId,
    paymentDate: schedule.paymentDate
  }
  if (schedule.payment) {
    payment.paymentAmount = Number.parseFloat(schedule.payment.value).toFixed(2)
  }
  return payment
}

async function getAll () {
  const schedule = await db.schedule.findAll({
    include: [db.payment],
    order: [['paymentDate', 'DESC']]
  })
  return schedule.map(scheduleMapper)
}

async function getById (claimId) {
  const schedule = await db.schedule.findAll({
    where: { claimId: claimId },
    include: [db.payment],
    order: [['paymentDate', 'DESC']]
  })
  return schedule.map(scheduleMapper)
}

async function create (claim, startDate) {
  const existingSchedule = await getById(claim.claimId)
  if (existingSchedule.length) {
    console.log('payments already scheduled for claim')
    return
  }

  const paymentDates = getPaymentDates(startDate)

  for (let i = 0; i < paymentDates.length; i++) {
    console.log('creating schedule')
    await db.schedule.upsert({
      claimId: claim.claimId,
      paymentDate: paymentDates[i]
    })
  }
}

module.exports = {
  getAll,
  getById,
  create
}
