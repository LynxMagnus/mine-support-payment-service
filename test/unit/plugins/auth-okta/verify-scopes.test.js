
const verifyScopes = require('../../../../server/plugins/auth-okta/verify-scopes')
describe('Verify scopes', () => {
  test('throws no error if all scopes present', () => {
    verifyScopes(['scopeOne', 'scopeTwo'], ['scopeTwo', 'scopeOne'])
  })

  test('throws error if scopes missing', () => {
    expect(() => verifyScopes(['scopeTwo'], ['scopeOne', 'scopeTwo']))
      .toThrow('["scopeTwo"] does not contain all required scopes')
  })

  test('throws error if scopes undefined', () => {
    expect(() => verifyScopes(undefined, ['scopeOne', 'scopeTwo']))
      .toThrow('Scope must be defined and an array')
  })

  test('throws error if scopes not an array', () => {
    expect(() => verifyScopes('scope1,scope2', ['scopeOne', 'scopeTwo']))
      .toThrow('Scope must be defined and an array')
  })
})
