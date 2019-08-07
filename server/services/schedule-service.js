const scheduleRepository = require('../repository/schedule-repository')

const basePayments = 6

module.exports = {
  create: async function (claim) {
    const existingSchedule = await scheduleRepository.getById(claim.claimId)
    if (existingSchedule.length) {
      console.log('payments already scheduled for claim')
      return
    }

    const paymentDates = getPaymentDates()
    paymentDates.forEach(paymentDate => {
      scheduleRepository.create({
        claimId: claim.claimId,
        paymentDate: paymentDate
      })
    })
  }
}

function getPaymentDates () {
  const dates = []
  const date = new Date()
  for (let i = 0; i < basePayments; i++) {
    date.setMonth(date.getMonth() + 1)
    date.setDate(1)
    dates.push(date)
  }
  return dates
}
