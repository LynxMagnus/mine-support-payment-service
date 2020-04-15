const config = require('../../config')
const oktaJwtVerifier = require('./okta-jwt-verifier')

function getTokenFromHeader (authHeader) {
  const token = authHeader && authHeader.replace('Bearer ', '')
  if (!token) {
    throw new Error('auth token not present')
  }
  return token
}

async function getOktaCredentials (authHeader) {
  const token = getTokenFromHeader(authHeader)
  const jwt = await oktaJwtVerifier.verifyAccessToken(token, `https://${config.okta.domain}`)
  return {
    userId: jwt.claims.sub,
    scope: jwt.claims.roles
  }
}

module.exports = getOktaCredentials
