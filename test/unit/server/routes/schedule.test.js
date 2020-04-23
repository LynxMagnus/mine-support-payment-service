describe('Schedule test', () => {
  let createServer
  let server
  let scheduleService

  beforeAll(async () => {
    const oktaJwtVerifier = require('../../../../server/plugins/auth-okta/okta-jwt-verifier')
    jest.mock('../../../../server/plugins/auth-okta/okta-jwt-verifier')
    oktaJwtVerifier.verifyAccessToken.mockImplementation(() => {
      console.log('validating token')
      Promise.resolve({ claims: { roles: ['payment-admin'] } })
    })

    jest.mock('../../../../server/services/schedule-service')
    scheduleService = require('../../../../server/services/schedule-service')
    createServer = require('../../../../server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  /* test('GET /schedule route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/schedule',
      headers: { authorization: 'Bearer token' }
    }
    const expectedPayload = {
      schedules: [
        {
          scheduleId: 1,
          claimId: 'MINE123',
          paymentDate: '2020-03-01T14:30:00.000Z'
        },
        {
          scheduleId: 2,
          claimId: 'MINE123',
          paymentDate: '2020-04-01T14:30:00.000Z'
        },
        {
          scheduleId: 3,
          claimId: 'MINE124',
          paymentDate: '2020-05-01T14:30:00.000Z'
        }
      ]
    }
    scheduleService.getAll = jest.fn(() => expectedPayload)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.payload)
    expect(payload).toEqual(expectedPayload)
  }) */

  test('GET /schedule/MINE123 retrieves schedule', async () => {
    const sampleClaimId = 'MINE123'
    const expectedPayload = {
      schedules: [
        {
          scheduleId: 1,
          claimId: 'MINE123',
          paymentDate: '2020-03-01T14:30:00.000Z'
        },
        {
          scheduleId: 2,
          claimId: 'MINE123',
          paymentDate: '2020-04-01T14:30:00.000Z'
        }
      ]
    }
    const options = {
      method: 'GET',
      url: `/schedule/${sampleClaimId}`
    }
    scheduleService.getById = jest.fn(() => expectedPayload)

    const response = await server.inject(options)
    expect(scheduleService.getById).toHaveBeenCalledWith(sampleClaimId)
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.payload)
    expect(payload).toEqual(expectedPayload)
  })

  test('GET non-existent claim id gives a 404', async () => {
    const sampleClaimId = 'NOTMINEWONTFIND'
    const expectedPayload = {
      schedules: []
    }
    const options = {
      method: 'GET',
      url: `/schedule/${sampleClaimId}`
    }
    scheduleService.getById = jest.fn(() => expectedPayload)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(404)
    expect(response.payload).toBe('Claim id not found')
  })

  afterEach(async () => {
    await server.stop()
  })
})
