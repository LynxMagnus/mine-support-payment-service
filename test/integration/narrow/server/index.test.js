describe('Server tests', () => {
  let createServer
  let server

  test('createServer returns server', async () => {
    jest.mock('../../../../server/config', () => {
      return {
        port: 3004,
        env: 'production'
      }
    })

    jest.mock('../../../../server/services/message-service')
    createServer = require('../../../../server')
    server = await createServer()

    expect(server).toBeDefined()
  })

  test('createServer returns server in development', async () => {
    jest.mock('../../../../server/config', () => {
      return {
        port: 3004,
        isDev: true
      }
    })

    jest.mock('../../../../server/services/message-service')
    createServer = require('../../../../server')
    server = await createServer()

    expect(server).toBeDefined()
  })
})
