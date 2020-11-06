const dbHelper = require('../../../db-helper')
const processPaymentMessage = require('../../../../app/messaging/process-payment-message')
const { models } = require('../../../../app/services/database-service')

describe('processing claim message', () => {
  const message = {
    body: {
      claimId: 'MINE1',
      value: 10
    },
    complete: jest.fn(),
    abandon: jest.fn()
  }

  beforeEach(async () => {
    await dbHelper.truncate()
  })

  afterEach(async () => {
    await dbHelper.truncate()
  })

  afterAll(async () => {
    await dbHelper.close()
  })

  test('should save valid claim', async () => {
    await processPaymentMessage(message)
    const payments = await models.payment.findAll({ where: { claimId: message.body.claimId }, raw: true })
    expect(payments.length).toBe(1)
  })

  test('should not save duplicate claim', async () => {
    await processPaymentMessage(message)
    await processPaymentMessage(message)
    const payments = await models.payment.findAll({ where: { claimId: message.body.claimId }, raw: true })
    expect(payments.length).toBe(1)
  })

  test('should complete valid claim', async () => {
    await processPaymentMessage(message)
    expect(message.complete).toHaveBeenCalled()
  })

  test('should abandon invalid claim', async () => {
    message.body = 'not a claim'
    await processPaymentMessage(message)
    expect(message.abandon).toHaveBeenCalled()
  })
})
