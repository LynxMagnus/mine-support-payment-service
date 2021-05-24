const config = require('../../app/config')
const dbHelper = require('../db-helper')

describe('Pact Verification', () => {
  const { Verifier } = require('@pact-foundation/pact')

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
    jest.mock('../../app/messaging')
    createServer = require('../../app/server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.start()
  })

  test('validates the expectations of ffc-demo-payment-web', async () => {
    const opts = {
      providerBaseUrl: `http://localhost:${config.port}`,
      provider: 'ffc-demo-payment-service',
      consumerVersionTags: ['main', 'dev', 'test', 'preprod', 'prod'],
      pactBrokerUrl: process.env.PACT_BROKER_URL,
      pactBrokerUsername: process.env.PACT_BROKER_USERNAME,
      pactBrokerPassword: process.env.PACT_BROKER_PASSWORD
    }

    await new Verifier(opts).verifyProvider()
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(async () => {
    await dbHelper.close()
  })
})
