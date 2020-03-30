const scheduleRepository = require('../repository/schedule-repository')
const aggregateByClaimId = require('./lib/aggregateByClaimId')

const BASE_PAYMENTS = 6

module.exports = {
  getAll: async function () {
    const scheduleLines = await scheduleRepository.getAll()
    return aggregateByClaimId(scheduleLines)
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
