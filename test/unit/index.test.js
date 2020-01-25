describe('Server tests', () => {
  const mockScheduleRespository = require('./server/repository/schedule-repository.mock')
  const mockPaymentRepository = require('./server/repository/payment-repository.mock')
  const mockMessageService = require('./server/services/message-service.mock')
  let createServer

  beforeEach(async () => {
    jest.mock('../../server/repository/schedule-repository', () => mockScheduleRespository)
    jest.mock('../../server/repository/payment-repository', () => mockPaymentRepository)
    jest.mock('../../server/services/message-service', () => mockMessageService)
  })

  afterEach(async () => {
    jest.unmock('../../server/repository/schedule-repository')
    jest.unmock('../../server/repository/payment-repository')
    jest.unmock('../../server/services/message-service')
  })

  test('createServer returns server', async (done) => {
    createServer = require('../../server')
    const server = await createServer()
    expect(server).toBeDefined()
    done()
  })
})
