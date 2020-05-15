
const OktaJwtVerifier = require('@okta/jwt-verifier')
const config = require('../../config')

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `https://${config.okta.domain}/oauth2/${config.okta.authorizationServerId}`,
  clientId: config.okta.clientId,
  assertClaims: {
    'scp.includes': config.okta.scopes
  }
})

module.exports = oktaJwtVerifier
