jest.mock('../../../../server/services/message-service')
const createServer = require('../../../../app/server')

function mockScheduleService () {
  const scheduleService = require('../../../../app/services/schedule-service')
  jest.mock('../../../../server/services/schedule-service')
  scheduleService.getAll.mockImplementation(() => [])
}

function mockOktaJwtVerifier () {
  const oktaJwtVerifier = require('../../../../app/plugins/auth/okta-jwt-verifier')
  jest.mock('../../../../server/plugins/auth/okta-jwt-verifier')
  oktaJwtVerifier.verifyAccessToken.mockImplementation(
    () => {
      return Promise.resolve({ claims: { roles: ['payment-admin'] } })
    }
  )
}

describe('API', () => {
  let server

  beforeAll(() => {
    mockScheduleService()
    mockOktaJwtVerifier()
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /schedule route returns 200 for valid token', async () => {
    const options = {
      method: 'GET',
      url: '/schedule',
      headers: {
        authorization: 'Bearer fakevalidtoken'
      }
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET /schedule route returns 401 error for missing token', async () => {
    const options = {
      method: 'GET',
      url: '/schedule',
      headers: {
        authorization: undefined
      }
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(401)
  })

  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    jest.resetAllMocks()
  })
})
