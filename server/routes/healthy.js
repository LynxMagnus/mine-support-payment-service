const databaseService = require('../services/database-service')

module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    handler: (request, h) => {
      if (databaseService.isConnected()) {
        return h.response('ok').code(200)
      } else {
        return h.response('database unavailable').code(500)
      }
    }
  }
}
