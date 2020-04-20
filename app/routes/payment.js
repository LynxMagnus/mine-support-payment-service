const payments = require('../services/payments')

module.exports = [
  {
    method: 'GET',
    path: '/payment',
    options: {
      handler: async (request, h) => {
        const schedules = await payments.getAll()
        return h.response(schedules).code(200)
      }
    }
  },
  {
    method: 'GET',
    path: '/payment/{claimId}',
    options: {
      handler: async (request, h) => {
        const payment = await payments.getById(request.params.claimId)
        return h.response(payment).code(200)
      }
    }
  }
]
