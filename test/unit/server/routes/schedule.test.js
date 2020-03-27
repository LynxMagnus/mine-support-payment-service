describe('Schedule test', () => {
  let createServer
  let server
  let scheduleService

  beforeAll(async () => {
    jest.mock('../../../../server/services/schedule-service')
    scheduleService = require('../../../../server/services/schedule-service')
    createServer = require('../../../../server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /payment-schedule route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/payment-schedule'
    }
    const expectedPayload = {
      schedules: [
        {
          claimId: 'MINE123',
          schedule: ['2020-04-01', '2020-05-01', '2020-05-01']
        }
      ]
    }

    scheduleService.getAll = jest.fn(() => expectedPayload)

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.payload)
    expect(payload).toEqual(expectedPayload)
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(async () => {
    jest.unmock('../../../../server/services/schedule-service')
  })
})
