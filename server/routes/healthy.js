const databaseService = require('../services/database-service')

const SERVICE_UNAVAILABLE = 503
const OK = 200

module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    handler: async (request, h) => {
      try {
        await (await databaseService).authenticate()
        return h.response('ok').code(OK)
      } catch (ex) {
        console.error('error running healthy check', ex)
        return h.response(`error running healthy check: ${ex.message}`).code(SERVICE_UNAVAILABLE)
      }
    }
  }
}
