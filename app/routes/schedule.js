const scheduling = require('../modules/scheduling')

module.exports = [
  {
    method: 'GET',
    path: '/schedule/{claimId}',
    options: {
      handler: async (request, h) => {
        const schedules = await scheduling.getById(request.params.claimId)
        return h.response(schedules).code(200)
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
        const schedules = await scheduling.getAll()
        return h.response(schedules).code(200)
      }
    }
  }
]
