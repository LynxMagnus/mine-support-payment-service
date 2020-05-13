const config = require('../../server/config')

describe('Pact Verification', () => {
  const { Verifier } = require('@pact-foundation/pact')
  const mockScheduleRepository = require('../unit/server/repository/schedule-repository.mock')
  const path = require('path')

  let createServer
  let server

  beforeAll(async () => {
    const oktaJwtVerifier = require('../../server/plugins/auth/okta-jwt-verifier')
    jest.mock('../../server/plugins/auth/okta-jwt-verifier')
    oktaJwtVerifier.verifyAccessToken.mockImplementation(() => Promise.resolve({ claims: { roles: ['payment-admin'] } }))

    jest.mock('../../server/repository/schedule-repository', () => mockScheduleRepository)
    jest.mock('../../server/services/message-service')
    createServer = require('../../server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('validates the expectations of ffc-demo-payment-web', async () => {
    const opts = {
      providerBaseUrl: `http://localhost:${config.port}`,
      provider: 'ffc-demo-payment-service',
      pactUrls: [
        path.resolve(__dirname, './pacts/ffc-demo-payment-web-ffc-demo-payment-service.json')
      ],
      customProviderHeaders: ['Authorization: Bearer token']
    }

    await new Verifier(opts).verifyProvider()
  })

  afterEach(async () => {
    await server.stop()
  })
})
