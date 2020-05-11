const fs = require('fs')
const secretFile = '/home/node/config/mysecret'

module.exports = [
  {
    method: 'GET',
    path: '/secret',
    options: {
      handler: async (request, h) => {
        return h.response({ mysecret: fs.readFileSync(secretFile, 'utf8') }).code(200)
      }
    }
  }
]
