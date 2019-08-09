describe('Schedule repository tests', () => {
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

  test('setupConnection function exists', async () => {
    expect(connectionService.setupConnection).toBeDefined()
  })

  test('configureMQ function exists', async () => {
    expect(connectionService.configureMQ).toBeDefined()
  })

  test('setupReceiver function exists', async () => {
    expect(connectionService.setupReceiver).toBeDefined()
  })

  test('openConnection function exists', async () => {
    expect(connectionService.openConnection).toBeDefined()
  })

  test('closeConnection function exists', async () => {
    expect(connectionService.closeConnection).toBeDefined()
  })
})
