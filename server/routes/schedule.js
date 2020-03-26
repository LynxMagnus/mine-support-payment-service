const scheduleService = require('../services/schedule-service')

module.exports = {
  method: 'GET',
  path: '/payment-schedule',
  options: {
    handler: async (request, h) => {
      const schedules = await scheduleService.getAll()
      return h.response(schedules).code(200)
    }
  }
}
