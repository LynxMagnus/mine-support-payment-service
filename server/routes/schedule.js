const scheduleService = require('../services/schedule-service')

module.exports = [
  {
    method: 'GET',
    path: '/schedule/{claimId}',
    options: {
      handler: async (request, h) => {
        const data = await scheduleService.getById(request.params.claimId)
        if (data && data.length) {
          return h.response(data).code(200)
        }
        return h.response('Claim id not found').code(404)
      }
    }
  },
  {
    method: 'GET',
    path: '/schedule',
    options: {
      auth: {
        strategy: 'auth-okta',
        scope: 'payment-admin'
      },
      handler: async (request, h) => {
        const schedules = await scheduleService.getAll()
        return h.response(schedules).code(200)
      }
    }
  }
]
