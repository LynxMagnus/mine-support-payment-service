describe('Healthy test', () => {
  let createServer
  let server
  let db

  beforeAll(async () => {
    jest.mock('../../../server/models')
    db = require('../../../server/models')
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

    db.isConnected = jest.fn(() => true)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /healthy route returns error if database unavailable', async () => {
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    db.isConnected = jest.fn(() => false)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(500)
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(async () => {
    jest.unmock('../../../server/models')
  })
})
