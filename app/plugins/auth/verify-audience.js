function verifyAudience (audience, expectedAudience) {
  if (audience !== expectedAudience) {
    throw Error(`Invalid audience: ${audience} is not ${expectedAudience}`)
  }
}
module.exports = verifyAudience
