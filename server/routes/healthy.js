const db = require('../models')
const connectionService = require('../services/connection-service')

module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    handler: async (request, h) => {
      if (await db.isConnected() && connectionService.isConnected()) {
        return h.response('ok').code(200)
      }
      return h.response('services unavailable').code(500)
    }
  }
}
