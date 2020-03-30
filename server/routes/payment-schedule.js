const paymentService = require('../services/payment-service')

module.exports = {
  method: 'GET',
  path: '/payment-schedule',
  options: {
    handler: async (request, h) => {
      const schedules = await paymentService.getAll()
      return h.response(schedules).code(200)
    }
  }
}
