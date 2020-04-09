const getCredentialsFromAccessToken = require('../services/jwt/get-credentials-from-access-token')

const pluginName = 'auth-okta'

function scheme () {
  return {
    authenticate: async (request, h) => {
      try {
        const credentials = await getCredentialsFromAccessToken(request.headers.authorization)
        return h.authenticated({ credentials })
      } catch (ex) {
        console.error(ex)
        return h.response(ex.message).code(401).takeover()
      }
    }
  }
}

module.exports = {
  plugin: {
    name: pluginName,
    register: (server) => {
      server.auth.scheme(pluginName, scheme)
      server.auth.strategy(pluginName, pluginName)
    }
  }
}
