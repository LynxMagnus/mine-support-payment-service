const config = require('../../config')

function getProvider (oidcProvider) {
  if (oidcProvider === 'okta') {
    return require('./get-okta-credentials')
  }
  if (oidcProvider === 'b2c') {
    return require('./get-b2c-credentials')
  }
  return require('./get-stubbed-credentials')
}

module.exports = getProvider(config.oidcProvider)
