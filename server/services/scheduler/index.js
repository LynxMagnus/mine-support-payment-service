const BASE_PAYMENTS = 6

function getPaymentDates (startDate) {
  return new Array(BASE_PAYMENTS).fill(startDate).map(getDate)
}

function getDate (dateIn, index) {
  const date = new Date(dateIn)
  date.setDate(1)
  date.setMonth(date.getMonth() + 1 + index)
  return date
}

module.exports = {
  getPaymentDates
}
