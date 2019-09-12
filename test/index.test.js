describe('Server tests', () => {
  let mockScheduleRespository = require('./server/repository/schedule-repository.mock')
  let mockPaymentRepository = require('./server/repository/payment-repository.mock')
  let mockConnectionService = require('./server/services/connection-service.mock')
  let createServer

  beforeEach(async () => {
    jest.mock('../server/repository/schedule-repository', () => mockScheduleRespository)
    jest.mock('../server/repository/payment-repository', () => mockPaymentRepository)
    jest.mock('../server/services/connection-service', () => mockConnectionService)
  })

  afterEach(async () => {
    jest.unmock('../server/repository/schedule-repository')
    jest.unmock('../server/repository/payment-repository')
    jest.unmock('../server/services/connection-service')
  })

  test('createServer returns server', async (done) => {
    createServer = require('../server')
    const server = await createServer()
    expect(server).toBeDefined()
    done()
  })
})
