describe('Home route tests', () => {
  const mockScheduleRespository = require('../repository/schedule-repository.mock')
  const mockPaymentRepository = require('../repository/payment-repository.mock')
  const mockConnectionService = require('../services/connection-service.mock')
  let createServer
  let server

  beforeEach(async () => {
    jest.mock('../../../server/repository/schedule-repository', () => mockScheduleRespository)
    jest.mock('../../../server/repository/payment-repository', () => mockPaymentRepository)
    jest.mock('../../../server/services/connection-service', () => mockConnectionService)
    createServer = require('../../../server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.unmock('../../../server/repository/schedule-repository')
    jest.unmock('../../../server/repository/payment-repository')
    jest.unmock('../../../server/services/connection-service')
    await server.stop()
  })

  test('GET / route returns message', async (done) => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    expect(response.result.message).toBe('ffc demo payment service')
    done()
  })
})
