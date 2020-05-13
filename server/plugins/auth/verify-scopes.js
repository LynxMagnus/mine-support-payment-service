function verifyScopes (scopes, expected) {
  if (scopes && Array.isArray(scopes)) {
    const everyScopeMatched = expected.map(s => scopes.indexOf(s) > -1).every(v => v === true)
    if (everyScopeMatched === false) {
      throw Error(`${JSON.stringify(scopes)} does not contain all required scopes`)
    }
  } else {
    throw Error('Scope must be defined and an array')
  }
}
module.exports = verifyScopes
