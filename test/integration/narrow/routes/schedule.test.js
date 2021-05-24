jest.mock('../../../../app/messaging')
const createServer = require('../../../../app/server')

function mockScheduleService () {
  const scheduleService = require('../../../../app/schedule')
  jest.mock('../../../../app/schedule')
  scheduleService.getAll.mockImplementation(() => [])
}

describe('API', () => {
  let server

  beforeAll(() => {
    mockScheduleService()
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /schedule route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/schedule'
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    jest.resetAllMocks()
  })
})
