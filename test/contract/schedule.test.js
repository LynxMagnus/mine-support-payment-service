describe('Schedule contract test', () => {
  const path = require('path')
  const { MessageConsumerPact } = require('@pact-foundation/pact')
  const Matchers = require('@pact-foundation/pact/dsl/matchers')
  const { createSchedule } = require('../../app/schedule')
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

  afterAll(async () => {
    await dbHelper.close()
  })

  test('schedule can process message', async () => {
    await messagePact
      .given('valid message')
      .expectsToReceive('a request for new payment schedule')
      .withContent({
        claimId: Matchers.like('MINE123')
      })
      .withMetadata({
        'content-type': 'application/json'
      })
      .verify(message => createSchedule(message.contents, new Date(2020, 11, 6)))
  })
})
