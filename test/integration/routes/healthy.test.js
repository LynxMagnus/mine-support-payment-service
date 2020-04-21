describe('Healthy test', () => {
  let createServer
  let server
  let databaseService
  let messageService

  beforeAll(async () => {
    jest.mock('../../../app/modules/database')
    databaseService = require('../../../app/modules/database')
    jest.mock('../../../app/modules/messaging')
    messageService = require('../../../app/modules/messaging')
    createServer = require('../../../app')
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

  afterAll(async () => {
    jest.clearAllMocks()
  })
})
