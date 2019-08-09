describe('Schedule repository tests', () => {
  const EventEmitter = require('events')
  let connectionService

  beforeEach(async () => {
    connectionService = require('../../../server/services/connection-service')
  })

  test('configureMQ returns config', async () => {
    const hostConfig = {
      host: 'localhost',
      port: 3000,
      transport: 'tcp',
      reconnectLimit: 10
    }
    const queueConfig = {
      user: 'user',
      password: 'password'
    }

    const result = connectionService.configureMQ(hostConfig, queueConfig)

    expect(result).toStrictEqual({
      host: hostConfig.host,
      port: hostConfig.port,
      transport: hostConfig.transport,
      reconnect_limit: hostConfig.reconnectLimit,
      username: queueConfig.user,
      password: queueConfig.password
    })
  })

  test('setupConnection sets up connection', async () => {
    const hostConfig = {
      host: 'localhost',
      port: 3000,
      transport: 'tcp',
      reconnectLimit: 10
    }
    const queueConfig = {
      user: 'user',
      password: 'password'
    }

    const connection = await connectionService.setupConnection(hostConfig, queueConfig)
    expect(connection).toBeDefined()
  })

  test('setupReceiver returns receiver', async () => {
    const connection = {
      createReceiver: async function (options) {
        return new EventEmitter()
      }
    }

    const receiver = await connectionService.setupReceiver(connection, 'name', 'address')

    expect(receiver).toBeDefined()
  })

  test('openConnection opens connection', async () => {
    const connection = {
      open: async function () {}
    }

    expect(async () => connectionService.openConnection(connection)).not.toThrow()
  })

  test('openConnection logs error', async () => {
    const spy = jest.spyOn(global.console, 'log')

    try {
      await connectionService.openConnection()
    } catch (err) {}

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test('closeConnection closes connection', async () => {
    const connection = {
      close: async function () {}
    }

    expect(async () => connectionService.closeConnection(connection)).not.toThrow()
  })

  test('closeConnection logs error', async () => {
    const spy = jest.spyOn(global.console, 'log')

    try {
      await connectionService.closeConnection()
    } catch (err) {}

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
