const scheduleService = require('../services/schedule-service')
const verifyAccessToken = require('../services/jwt/verify')

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
        try {
          await verifyAccessToken(request.headers.authorization)
        } catch (ex) {
          console.error(ex)
          return h.response(ex.message).code(401)
        }
        const schedules = await scheduleService.getAll()
        return h.response(schedules).code(200)
      }
    }
  }
]
