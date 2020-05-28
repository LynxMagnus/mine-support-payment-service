const config = require('../../server/config')
const dbHelper = require('../local-integration/services/db-helper')

describe.skip('Pact Verification', () => {
  const { Verifier } = require('@pact-foundation/pact')
  const path = require('path')

  let createServer
  let server

  async function createTestData () {
    await dbHelper.truncate()
    await dbHelper.createPaymentRecords([
      { claimId: 'MINE001', value: 150.50 },
      { claimId: 'MINE002', value: 50.75 }
    ])
    await dbHelper.createScheduleRecords([
      { scheduleId: 1, claimId: 'MINE001', paymentDate: '2020-02-02 02:02:00' },
      { scheduleId: 2, claimId: 'MINE001', paymentDate: '2020-03-30 13:53:10' },
      { scheduleId: 3, claimId: 'MINE002', paymentDate: '2020-01-01 16:53:10' }
    ])
  }

  beforeAll(async () => {
    await createTestData()
    const oktaJwtVerifier = require('../../server/plugins/auth/okta-jwt-verifier')
    jest.mock('../../server/plugins/auth/okta-jwt-verifier')
    oktaJwtVerifier.verifyAccessToken.mockImplementation(() => Promise.resolve({ claims: { roles: ['payment-admin'] } }))

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

  afterAll(() => {
    dbHelper.close()
  })
})
