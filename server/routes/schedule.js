const scheduleService = require('../services/schedule-service')
const verifyAccessToken = require('../services/verify-access-token')

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
      handler: async (request, h) => {
        await verifyAccessToken(request.headers.authorization)
        const schedules = await scheduleService.getAll()
        return h.response(schedules).code(200)
      }
    }
  }
]
