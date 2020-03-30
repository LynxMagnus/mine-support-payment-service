module.exports = (scheduleLines) => {
  const schedules = scheduleLines.reduce((r, a) => {
    const item = r.filter((i) => i.claimId === a.claimId)[0]
    if (item) {
      item.paymentDates.push(a.paymentDate)
    } else {
      r.push({ claimId: a.claimId, paymentDates: [a.paymentDate] })
    }
    return r
  }, [])

  return schedules
}
