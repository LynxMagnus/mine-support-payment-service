describe('API', () => {
  let createServer
  let server

  beforeAll(async () => {
    jest.mock('../../server/services/database-service')
    createServer = require('../../server/index')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
    jest.clearAllMocks()
  })

  test('GET / route returns 404', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(404)
    expect((response.headers['content-type'])).toEqual(expect.stringContaining('application/json'))
  })

  test('GET /payment-schedule route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/payment-schedule'
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect((response.headers['content-type'])).toEqual(expect.stringContaining('application/json'))
    const payload = JSON.parse(response.payload)
    expect(payload).toEqual({})
  })

  // test('POST /claim route works with valid content', async () => {
  //   const restClient = require('../app/services/rest-client')
  //   const options = {
  //     method: 'POST',
  //     url: '/claim',
  //     payload: {
  //       claimId: 'MINE123',
  //       propertyType: 'business',
  //       accessible: false,
  //       dateOfSubsidence: new Date(),
  //       mineType: ['gold', 'iron'],
  //       email: 'nobody@example.com'
  //     }
  //   }

  //   const response = await server.inject(options)
  //   expect(response.statusCode).toBe(200)
  //   expect(restClient.postJson).toHaveBeenCalledTimes(2)
  // })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(async () => {
    jest.unmock('../../server/services/database-service')
  })
})
