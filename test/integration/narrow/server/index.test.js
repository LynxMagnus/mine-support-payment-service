describe('Server tests', () => {
  let createServer
  let server

  beforeAll(() => {
    jest.mock('../../../../server/services/message-service')
  })

  test('createServer returns server', () => {
    jest.mock('../../../../server/config', () => {
      return {
        port: 3004,
        env: 'production'
      }
    })

    createServer = require('../../../../server')
    server = createServer()

    expect(server).toBeDefined()
  })

  test('createServer returns server in development', () => {
    jest.mock('../../../../server/config', () => {
      return {
        port: 3004,
        isDev: true
      }
    })

    createServer = require('../../../../server')
    server = createServer()

    expect(server).toBeDefined()
  })
})
