describe('Okta JWT Verifier', () => {
  test('instantiates verifier without error', () => {
    const oktaJwtVerifier = require('../../../../server/plugins/auth-okta/okta-jwt-verifier')
    expect(oktaJwtVerifier).toBeDefined()
  })
})
