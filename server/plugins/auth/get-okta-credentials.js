const config = require('../../config')
const getTokenFromHeader = require('./get-token-from-header')
const oktaJwtVerifier = require('./okta-jwt-verifier')

async function getOktaCredentials (authHeader) {
  const token = getTokenFromHeader(authHeader)
  const jwt = await oktaJwtVerifier.verifyAccessToken(token, `https://${config.okta.domain}`)
  return {
    userId: jwt.claims.sub,
    scope: jwt.claims.roles
  }
}

module.exports = getOktaCredentials
