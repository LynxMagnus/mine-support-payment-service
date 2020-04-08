describe('Okta JWT Verifier', () => {
  test('instantiates verifier without error', () => {
    const oktaJwtVerifier = require('../../../../server/services/jwt/okta-jwt-verifier')
    expect(oktaJwtVerifier).toBeDefined()
  })
})
