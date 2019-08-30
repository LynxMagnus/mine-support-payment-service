
module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    handler: (request, h) => {
      try {
        const db = require('../models')
        if (db.hasOwnProperty('sequelize')) {
          return h.response('ok').code(200)
        }
      } catch (err) {
        return h.response(err).code(500)
      }
    }
  }
}
