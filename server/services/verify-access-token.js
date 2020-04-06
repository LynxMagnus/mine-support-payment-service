const OktaJwtVerifier = require('@okta/jwt-verifier')
const config = require('../config')

const oktaJwtVerifier = config.oktaEnabled && new OktaJwtVerifier({
  issuer: `https://${config.okta.domain}/oauth2/${config.okta.authorizationServerId}`,
  clientId: config.okta.clientId,
  assertClaims: {
    'scp.includes': config.okta.scopes
  }
})

function verify (authHeader) {
  if (config.oktaEnabled) {
    const token = authHeader && authHeader.split(' ')[1]
    const jwt = oktaJwtVerifier.verifyAccessToken(token, `https://${config.okta.domain}`)
    console.log('**jwt scopes**', jwt.claims.scp)
  } else {
    Promise.resolve(true)
  }
}

module.exports = verify
