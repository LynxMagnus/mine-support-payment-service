const paymentService = require('../services/payment-service')

module.exports = [
  {
    method: 'GET',
    path: '/payment',
    options: {
      handler: async (request, h) => {
        const schedules = await paymentService.getAll()
        return h.response(schedules).code(200)
      }
    }
  },
  {
    method: 'GET',
    path: '/payment/{claimId}',
    options: {
      handler: async (request, h) => {
        const payment = await paymentService.getById(request.params.claimId)
        return h.response(payment).code(200)
      }
    }
  }
]
