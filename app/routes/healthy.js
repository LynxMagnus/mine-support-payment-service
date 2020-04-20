const database = require('../modules/database')
const messaging = require('../modules/messaging')

module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    handler: async (request, h) => {
      if (await database.isConnected() && messaging.isRunning()) {
        return h.response('ok').code(200)
      }
      return h.response('services unavailable').code(500)
    }
  }
}
