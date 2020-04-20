describe('Pact Verification', () => {
  const { Verifier } = require('@pact-foundation/pact')
  const mockScheduleRepository = require('../unit/server/repository/schedule-repository.mock')
  const path = require('path')

  let createServer
  let server

  beforeAll(async () => {
    jest.mock('../../server/repository/schedule-repository', () => mockScheduleRepository)
    createServer = require('../../server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('validates the expectations of ffc-demo-payment-web', () => {
    const opts = {
      logLevel: 'INFO',
      providerBaseUrl: 'http://localhost:3004',
      provider: 'ffc-demo-payment-service',
      providerVersion: '1.0.0',
      pactUrls: [
        path.resolve(__dirname, './pact/ffc-demo-payment-web-ffc-demo-payment-service.json')
      ]
      //   stateHandlers: {
      //     'get all schedules': () => {
      //         mockScheduleRepository.getAll = () => new Map([
      //         ['10', new Product('10', 'CREDIT_CARD', '28 Degrees', 'v1')]
      //       ])
      //     }
      //   }
    }

    return new Verifier(opts).verifyProvider().finally(() => {
      server.stop()
    })
  })
})
