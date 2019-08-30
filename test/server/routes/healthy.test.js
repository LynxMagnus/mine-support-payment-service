describe('Healthy test', () => {
  let createServer
  let server

  beforeAll(async () => {
    createServer = require('../../../server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    jest.resetModules()
  })

  test('GET /healthy route returns 200', async () => {
    jest.mock('../../../server/models', () => {
      return {
        sequelize: {}
      }
    })
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /healthy route returns error if database unavailable', async () => {
    jest.mock('../../../server/models', () => {})
    const options = {
      method: 'GET',
      url: '/healthy'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(500)
  })

  afterEach(async () => {
    await server.stop()
  })
})
