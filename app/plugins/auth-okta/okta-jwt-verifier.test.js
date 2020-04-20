describe('Okta JWT Verifier', () => {
  test('instantiates verifier without error', () => {
    const oktaJwtVerifier = require('./okta-jwt-verifier')
    expect(oktaJwtVerifier).toBeDefined()
  })
})
