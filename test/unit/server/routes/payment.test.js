describe('Payment test', () => {
  let createServer
  let server
  let paymentService

  beforeAll(async () => {
    jest.mock('../../../../server/services/payment-service')
    paymentService = require('../../../../server/services/payment-service')
    createServer = require('../../../../server')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /payment route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/payment'
    }
    const expectedPayload = {
      schedules: [
        {
          claimId: 'MINE123',
          paymentAmount: '150.50',
          schedule: [
            '2020-03-01T14:30:00.000Z',
            '2020-04-01T14:30:00.000Z'
          ]
        },
        {
          claimId: 'MINE124',
          paymentAmount: '50.75',
          schedule: [
            '2020-05-01T14:30:00.000Z'
          ]
        }
      ]
    }
    paymentService.getAll = jest.fn(() => expectedPayload)

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
