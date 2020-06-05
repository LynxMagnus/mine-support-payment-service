const { getPayment, getPayments } = require('./payment-handler')

module.exports = [
  {
    method: 'GET',
    path: '/payment/{claimId}',
    options: {
      handler: getPayment
    }
  },
  {
    method: 'GET',
    path: '/payment',
    options: {
      handler: getPayments
    }
  }
]
