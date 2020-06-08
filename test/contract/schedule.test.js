describe('Schedule AMQP contract test', () => {
  const path = require('path')
  const { MessageConsumerPact } = require('@pact-foundation/pact')
  const Matchers = require('@pact-foundation/pact/dsl/matchers')
  const scheduleMessageAction = require('../../server/services/schedule-message-action')
  const dbHelper = require('../db-helper')
  let messagePact

  beforeAll(async () => {
    await dbHelper.truncate()

    messagePact = new MessageConsumerPact({
      consumer: 'ffc-demo-payment-service',
      provider: 'ffc-demo-claim-service',
      log: path.resolve(process.cwd(), 'test-output', 'pact.log'),
      dir: path.resolve(process.cwd(), 'test-output')
    })
  })

  afterAll(() => {
    dbHelper.close()
  })

  test('scheduleMessageAction can process message', async () => {
    await messagePact
      .given('valid message')
      .expectsToReceive('a request for new payment schedule')
      .withContent({
        claimId: Matchers.like('MINE123')
      })
      .withMetadata({
        'content-type': 'application/json'
      })
      .verify(message => scheduleMessageAction(message.contents))
  })
})
