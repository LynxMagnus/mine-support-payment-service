const db = require('../models')

module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    handler: async (request, h) => {
      if (await db.isConnected()) {
        return h.response('ok').code(200)
      }
      return h.response('services unavailable').code(500)
    }
  }
}
