describe('Server tests', () => {
  const mockMessageService = require('./server/services/message-service.mock')
  let createServer

  beforeEach(async () => {
    jest.mock('../../server/services/message-service', () => mockMessageService)
  })

  afterEach(async () => {
    jest.unmock('../../server/services/message-service')
  })

  test('createServer returns server', async (done) => {
    createServer = require('../../server')
    const server = await createServer()
    expect(server).toBeDefined()
    done()
  })
})
