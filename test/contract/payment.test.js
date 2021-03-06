const path = require('path')
const { MessageConsumerPact } = require('@pact-foundation/pact')
const Matchers = require('@pact-foundation/pact/dsl/matchers')
const asbHelper = require('../asb-helper')
const { createPayment } = require('../../app/payment')
const dbHelper = require('../db-helper')

describe('receiving a new claim', () => {
  let messagePact

  beforeAll(async () => {
    await asbHelper.clearAllSubscriptions()
    await dbHelper.truncate()

    messagePact = new MessageConsumerPact({
      consumer: 'ffc-demo-payment-service',
      provider: 'ffc-demo-calculation-service',
      log: path.resolve(process.cwd(), 'test-output', 'pact.log'),
      dir: path.resolve(process.cwd(), 'test-output')
    })
  }, 30000)

  afterAll(async () => {
    await asbHelper.clearAllSubscriptions()
    await dbHelper.close()
  }, 30000)

  test('new claim is received, saved and published to other services', async () => {
    await messagePact
      .given('valid message')
      .expectsToReceive('a request for new claim')
      .withContent({
        claimId: Matchers.like('MINE123'),
        propertyType: Matchers.like('business'),
        dateOfSubsidence: Matchers.iso8601DateTime(),
        mineType: Matchers.like('["gold"]'),
        email: Matchers.email()
      })
      .withMetadata({
        'content-type': 'application/json'
      })
      .verify(message => createPayment(message.contents))
  })
})
