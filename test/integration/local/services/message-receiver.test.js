const MessageReceiver = require('../../../../server/services/messaging/message-receiver')
const MessageSender = require('../../../../server/services/messaging/message-sender')
const config = require('../../../../server/config')

describe('message receiver', () => {
  const message = { content: 'hello', claimId: 'claimId' }
  const testConfig = { ...config.paymentQueue }
  let messageReceiver
  let messageSender

  beforeEach(async () => {
    messageSender = new MessageSender('test-sender', testConfig)
    await messageSender.sendMessage(message)
    await messageSender.closeConnection()
  })

  afterEach(async () => {
    await messageReceiver.closeConnection()
  })

  test('message receiver can receive messages', async () => {
    expect.assertions(1)
    let done
    const promise = new Promise((resolve) => { done = resolve })
    const action = (result) => done(result.hello === message.hello)
    messageReceiver = new MessageReceiver('test-receiver', testConfig, undefined, action)

    return expect(promise).resolves.toEqual(true)
  })
})
