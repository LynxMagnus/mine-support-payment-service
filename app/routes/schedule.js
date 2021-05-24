const { getById, getAll } = require('../schedule')

module.exports = [
  {
    method: 'GET',
    path: '/schedule/{claimId}',
    options: {
      handler: async (request, h) => {
        const data = await getById(request.params.claimId)
        if (data && data.length) {
          return h.response(data).code(200)
        }
        return h.response('Claim not found').code(404)
      }
    }

  },
  {
    method: 'GET',
    path: '/schedule',
    options: {
      handler: async (request, h) => {
        const schedules = await getAll()
        return h.response(schedules).code(200)
      }
    }
  }
]
