const scheduleRepository = require('../repository/schedule-repository')

const BASE_PAYMENTS = 6

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

module.exports = {
  getAll: async function () {
    const schedule = await scheduleRepository.getAll()
    return schedule.map(scheduleMapper)
  },
  getById: async function (claimId) {
    const schedule = await scheduleRepository.getById(claimId)
    return schedule.map(scheduleMapper)
  },
  create: async function (claim) {
    const existingSchedule = await scheduleRepository.getById(claim.claimId)
    if (existingSchedule.length) {
      console.log('payments already scheduled for claim')
      return
    }

    const paymentDates = new Array(BASE_PAYMENTS).fill(new Date()).map(getDate)

    for (let i = 0; i < paymentDates.length; i++) {
      console.log('creating schedule')
      await scheduleRepository.create({
        claimId: claim.claimId,
        paymentDate: paymentDates[i]
      })
    }
  }
}

function getDate (dateIn, index) {
  const date = new Date(dateIn)
  date.setMonth(date.getMonth() + 1 + index)
  date.setDate(1)
  return date
}
