// const databaseService = require('../services/database-service')

module.exports = {
  method: 'GET',
  path: '/payment-schedule',
  options: {
    handler: async (request, h) => {
      return h.response({}).code(200)
    }
  }
}
