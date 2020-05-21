describe('Okta JWT Verifier', () => {
  test('instantiates verifier without error', () => {
    const oktaJwtVerifier = require('../../../server/plugins/auth/okta-jwt-verifier')
    expect(oktaJwtVerifier).toBeDefined()
  })
})
