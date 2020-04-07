const config = require('../../config')
const oktaJwtVerifier = require('./okta-jwt-verifier')

async function verifyOktaAccessToken (authHeader) {
  const token = authHeader && authHeader.split(' ')[1]
  if (token) {
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, `https://${config.okta.domain}`)
    console.log('**jwt scopes**', jwt.claims.scp)
  } else {
    throw new Error('auth token not present')
  }
}

module.exports = verifyOktaAccessToken
