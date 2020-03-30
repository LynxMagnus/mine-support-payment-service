const db = require('../../server/models')

describe('API', () => {
  let createServer
  let server

  beforeAll(async () => {
    await db.schedule.bulkCreate([
      { scheduleId: 1, claimId: 'MINE123', paymentDate: '2020-03-01 14:30' },
      { scheduleId: 2, claimId: 'MINE123', paymentDate: '2020-04-01 14:30' },
      { scheduleId: 3, claimId: 'MINE124', paymentDate: '2020-05-01 14:30' }
    ])
    await db.payment.bulkCreate([
      { claimId: 'MINE123', value: 150.50 },
      { claimId: 'MINE124', value: 50.75 }
    ])
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
      url: '/payment'
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect((response.headers['content-type'])).toEqual(expect.stringContaining('application/json'))
    const payload = JSON.parse(response.payload)
    const expectedPayload = [
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
    expect(payload).toEqual(expectedPayload)
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(async () => {
    await db.schedule.destroy({ truncate: true })
  })
})
