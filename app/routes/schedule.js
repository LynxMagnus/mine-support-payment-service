const { getClaim, getClaims } = require('./schedule-handler')

module.exports = [
  {
    method: 'GET',
    path: '/schedule/{claimId}',
    options: {
      handler: getClaim
    }
  },
  {
    method: 'GET',
    path: '/schedule',
    options: {
      auth: {
        strategy: 'auth',
        scope: 'payment-admin'
      },
      handler: getClaims
    }
  }
]
