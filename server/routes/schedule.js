const scheduleService = require('../services/schedule-service')

module.exports = [
  {
    method: 'GET',
    path: '/schedule/{claimId}',
    options: {
      handler: async (request, h) => {
        const schedules = await scheduleService.getById(request.params.claimId)
        return h.response(schedules).code(200)
      }
    }
  },
  {
    method: 'GET',
    path: '/schedule',
    options: {
      // auth: {
      //   strategy: 'auth-okta',
      //   scope: 'payment-admin'
      // },
      handler: async (request, h) => {
        const schedules = await scheduleService.getAll()
        return h.response(schedules).code(200)
      }
    }
  }
]
