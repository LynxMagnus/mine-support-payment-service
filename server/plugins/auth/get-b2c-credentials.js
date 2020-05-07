var jwt = require('jsonwebtoken')

const { b2c } = require('../../config')
const verifyAudience = require('./verify-audience')
const verifyScopes = require('./verify-scopes')
const getTokenFromHeader = require('./get-token-from-header')

async function getB2cCredentials (authHeader) {
  const token = getTokenFromHeader(authHeader)
  const decoded = jwt.decode(token)
  verifyAudience(decoded.aud, b2c.clientId)
  verifyScopes(decoded.scp, b2c.scopes)
  return {
    userId: jwt.givenName + jwt.surname,
    scope: ['payment-admin']
  }
}

module.exports = getB2cCredentials
