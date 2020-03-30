const scheduleRepository = require('../repository/schedule-repository')

const BASE_PAYMENTS = 6

module.exports = {
  getAll: async function () {
    const schedule = await scheduleRepository.getAll()
    return schedule.map((s) => {
      const payment = {
        claimId: s.claimId,
        paymentDate: s.paymentDate
      }
      if (s.payment) {
        payment.paymentAmount = Number.parseFloat(s.payment.value).toFixed(2)
      }
      return payment
    })
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
