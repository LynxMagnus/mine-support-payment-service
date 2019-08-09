describe('Server tests', () => {
  let mockScheduleRespository = require('./repository/schedule-repository.mock')
  let mockPaymentRepository = require('./repository/payment-repository.mock')
  let mockConnectionService = require('./services/connection-service.mock')
  let createServer
  let server

  beforeEach(async () => {
    jest.mock('../../server/repository/schedule-repository', () => mockScheduleRespository)
    jest.mock('../../server/repository/payment-repository', () => mockPaymentRepository)
    jest.mock('../../server/services/connection-service', () => mockConnectionService)
  })

  afterEach(async () => {
    jest.unmock('../../server/repository/schedule-repository')
    jest.unmock('../../server/repository/payment-repository')
    jest.unmock('../../server/services/connection-service')
  })

  test('createServer returns server', async () => {
    jest.mock('../../server/config', () => {
      return {
        port: 3004,
        env: 'production'
      }
    })

    createServer = require('../../server')
    server = createServer()

    expect(server).toBeDefined()
  })

  test('createServer returns server in development', async () => {
    jest.mock('../../server/config', () => {
      return {
        port: 3004,
        isDev: true
      }
    })

    createServer = require('../../server')
    server = createServer()

    expect(server).toBeDefined()
  })
})
