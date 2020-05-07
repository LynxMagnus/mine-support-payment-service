function verifyAudience (audience, expectedAudience) {
  if (audience !== expectedAudience) {
    throw Error(`Invalid audience: ${audience}`)
  }
}
module.exports = verifyAudience
