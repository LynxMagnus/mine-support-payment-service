const MessageReceiver = require('../../../../server/services/messaging/message-receiver')
const MessageSender = require('../../../../server/services/messaging/message-sender')
const config = require('../../../../server/config')

describe('message receiver', () => {
  const message = { content: 'hello', claimId: 'jeff' }
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

  test('message receiver can receive messages', (done) => {
    const action = (result) => {
      done()
    }
    messageReceiver = new MessageReceiver('test-receiver', testConfig, undefined, action)
  })
})
