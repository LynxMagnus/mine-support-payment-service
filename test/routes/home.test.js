describe('Home test', () => {
  const createServer = require('../../server')
  let server

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET / route returns message', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    expect(response.message).toBe('mine support payment service')
  })
})
