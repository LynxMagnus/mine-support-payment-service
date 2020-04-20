function paymentMapper (payment) {
  return {
    claimId: payment.claimId,
    paymentAmount: Number.parseFloat(payment.value).toFixed(2),
    schedule: payment.schedules.map((s) => s.paymentDate)
  }
}

module.exports = paymentMapper
