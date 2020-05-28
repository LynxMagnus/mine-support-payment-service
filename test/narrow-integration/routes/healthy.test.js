describe('Healthy test', () => {
  let createServer
  let server
  let databaseService
  let messageService

  beforeAll(async () => {
    jest.mock('../../../server/services/database-service')
    databaseService = require('../../../server/services/database-service')
    jest.mock('../../../server/services/message-service')
    messageService = require('../../../server/services/message-service')
    createServer = require('../../../server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /healthy route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    databaseService.isConnected = jest.fn(() => true)
    messageService.isRunning = jest.fn(() => true)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /healthy route returns error if database unavailable', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    databaseService.isConnected = jest.fn(() => false)
    messageService.isRunning = jest.fn(() => true)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(500)
  })

  test('GET /healthy route returns error if message queue unavailable', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    databaseService.isConnected = jest.fn(() => true)
    messageService.isRunning = jest.fn(() => false)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(500)
  })

  test('GET /healthy route returns error if message queue and database unavailable', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    databaseService.isConnected = jest.fn(() => false)
    messageService.isRunning = jest.fn(() => false)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(500)
  })

  afterEach(async () => {
    await server.stop()
  })
})
