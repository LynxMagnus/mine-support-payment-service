describe('Process Error plugin tests', () => {
  let mockScheduleRespository = require('../repository/schedule-repository.mock')
  let mockPaymentRepository = require('../repository/payment-repository.mock')
  let mockConnectionService = require('../services/connection-service.mock')
  let createServer
  let server

  beforeEach(async () => {
    jest.mock('../../server/repository/schedule-repository', () => mockScheduleRespository)
    jest.mock('../../server/repository/payment-repository', () => mockPaymentRepository)
    jest.mock('../../server/services/connection-service', () => mockConnectionService)
    createServer = require('../../server')
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.unmock('../../server/repository/schedule-repository')
    jest.unmock('../../server/repository/payment-repository')
    jest.unmock('../../server/services/connection-service')
  })

  test('processErrorResponse returns 404 status code', async () => {
    const options = {
      method: 'GET',
      url: '/invalid'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe('404')
  })
})
