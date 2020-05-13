function getTokenFromHeader (authHeader) {
  const token = authHeader && authHeader.replace('Bearer ', '')
  if (!token) {
    throw new Error('auth token not present')
  }
  return token
}
module.exports = getTokenFromHeader
