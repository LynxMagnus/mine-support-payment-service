describe('Okta JWT Verifier', () => {
  test('instantiates verifier without error', () => {
    const oktaJwtVerifier = require('../../../../app/plugins/auth/okta-jwt-verifier')
    expect(oktaJwtVerifier).toBeDefined()
  })
})
