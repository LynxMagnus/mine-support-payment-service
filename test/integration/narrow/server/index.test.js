describe('Server tests', () => {
  let createServer
  let server

  test('createServer returns server', async () => {
    jest.mock('../../../../server/config', () => {
      return {
        port: 3004,
        isDev: false
      }
    })

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

    createServer = require('../../../../server')
    server = await createServer()

    expect(server).toBeDefined()
  })

  beforeEach(() => {
    jest.resetModules()
    jest.mock('../../../../server/services/message-service')
    jest.mock('../../../../server/plugins/router', () => {
      return {
        plugin: {
          name: 'mockrouter',
          register: () => {}
        }
      }
    })
  })
})
