
const MessageBase = require('../../../../server/services/messaging/message-base')
const config = require('../../../../server/config')

const consoleErrorOrig = console.consoleError

let messageBase

describe('message base', () => {
  beforeAll(() => {
    console.error = jest.fn()
  })

  afterAll(() => {
    console.error = consoleErrorOrig
  })

  afterEach(async () => {
    await messageBase.closeConnection()
  })

  test('open connection error is logged with name then rethrown', async () => {
    const testConfig = { ...config.paymentQueueConfig, password: 'notthepassword' }
    const name = 'test-base'
    messageBase = new MessageBase(name, testConfig)
    let ex
    try {
      await messageBase.openConnection()
    } catch (err) {
      ex = err
    }
    expect(ex.message).toContain('Failed to authenticate')
    expect(console.error).toHaveBeenCalledTimes(1)

    expect(console.error).toHaveBeenCalledWith(`error opening ${name} connection`, ex)
  })
})
