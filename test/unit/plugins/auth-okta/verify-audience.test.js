
const verifyAudience = require('../../../../server/plugins/auth/verify-audience')
describe('Verify scopes', () => {
  test('throws no error if audiences match', () => {
    verifyAudience('aud1', 'aud1')
  })
  test('throws error if audiences do not match', () => {
    expect(() => verifyAudience('aud2', 'aud1')).toThrow('Invalid audience: aud2')
  })
})
