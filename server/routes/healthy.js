
module.exports = {
  method: 'GET',
  path: '/healthy',
  options: {
    handler: (request, h) => {
      try {
        require('../models')
        return h.response('ok').code(200)
      } catch (err) {
        return h.response(err).code(500)
      }
    }
  }
}
