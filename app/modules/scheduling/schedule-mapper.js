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

module.exports = scheduleMapper
