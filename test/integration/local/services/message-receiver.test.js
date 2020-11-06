const MessageReceiver = require('../../../../app/messaging/message-receiver')
const MessageSender = require('../../../../app/messaging/message-sender')
const config = require('../../../../app/config')

describe('message receiver', () => {
  const message = { content: 'hello' }
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

  test('message receiver can receive messages', () => {
    expect.assertions(1)
    let done
    const promise = new Promise((resolve) => { done = resolve })
    const action = (result) => {
      done(result.content === message.content)
    }

    messageReceiver = new MessageReceiver('test-receiver', testConfig, undefined, action)

    return expect(promise).resolves.toEqual(true)
  })
})
