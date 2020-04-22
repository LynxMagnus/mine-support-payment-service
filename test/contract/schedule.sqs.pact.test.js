const path = require('path')
const { MessageConsumerPact } = require('@pact-foundation/pact')
const Matchers = require('@pact-foundation/pact/dsl/matchers')
const { scheduleMessageAction } = require('../../server/services/schedule-message-action')
const pactMessageHandler = require('./pactMessageHandler')
let messagePact

describe('Schedule SQS contract test', () => {
  beforeAll(async () => {
    messagePact = new MessageConsumerPact({
      consumer: 'ffc-demo-payment-service',
      provider: 'ffc-demo-claim-service',
      log: path.resolve(process.cwd(), 'test-output', 'pact.log'),
      dir: path.resolve(process.cwd(), 'test-output')
    })
  })

  test('scheduleMessageAction can process message', async () => {
    return (
      messagePact
        .given('valid message')
        .expectsToReceive('a request for new payment schedule')
        .withContent({
          claimId: Matchers.like('MINE123')
        })
        .verify(pactMessageHandler(scheduleMessageAction))
    )
  })
})
