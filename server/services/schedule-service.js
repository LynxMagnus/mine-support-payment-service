const scheduleRepository = require('../repository/schedule-repository')
// const db = require('../models')

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
  const schedule = await scheduleRepository.getAll()
  return schedule.map(scheduleMapper)
}

module.exports = {
  getAll,
  getById: async function (claimId) {
    const schedule = await scheduleRepository.getById(claimId)
    return schedule.map(scheduleMapper)
  },
  create: async function (claim, startDate) {
    const existingSchedule = await scheduleRepository.getById(claim.claimId)
    if (existingSchedule.length) {
      console.log('payments already scheduled for claim')
      return
    }

    const paymentDates = getPaymentDates(startDate)

    for (let i = 0; i < paymentDates.length; i++) {
      console.log('creating schedule')
      await scheduleRepository.create({
        claimId: claim.claimId,
        paymentDate: paymentDates[i]
      })
    }
  }
}
