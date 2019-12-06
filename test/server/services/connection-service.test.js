describe('Schedule repository tests', () => {
  const EventEmitter = require('events')
  let connectionService

  beforeEach(async () => {
    connectionService = require('../../../server/services/connection-service')
  })

  test('configureMQ returns config', async (done) => {
    const hostConfig = {
      host: 'localhost',
      hostname: 'localhost',
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
      hostname: hostConfig.hostname,
      port: hostConfig.port,
      transport: hostConfig.transport,
      reconnect_limit: hostConfig.reconnectLimit,
      username: queueConfig.user,
      password: queueConfig.password
    })
    done()
  })

  test('setupConnection sets up connection', async (done) => {
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
    done()
  })

  test('setupReceiver returns receiver', async (done) => {
    const connection = {
      createReceiver: async function (options) {
        return new EventEmitter()
      }
    }

    const receiver = await connectionService.setupReceiver(connection, 'name', 'address')

    expect(receiver).toBeDefined()
    done()
  })

  test('openConnection opens connection', async (done) => {
    const connection = {
      open: async function () {}
    }

    expect(async () => connectionService.openConnection(connection)).not.toThrow()
    done()
  })

  test('openConnection logs error', async (done) => {
    const spy = jest.spyOn(global.console, 'log')

    try {
      await connectionService.openConnection()
    } catch (err) {}

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
    done()
  })

  test('closeConnection closes connection', async (done) => {
    const connection = {
      close: async function () {}
    }

    expect(async () => connectionService.closeConnection(connection)).not.toThrow()
    done()
  })

  test('closeConnection logs error', async (done) => {
    const spy = jest.spyOn(global.console, 'log')

    try {
      await connectionService.closeConnection()
    } catch (err) {}

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
    done()
  })
})
