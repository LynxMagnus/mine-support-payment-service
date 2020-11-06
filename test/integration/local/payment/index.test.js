const dbHelper = require('../../../db-helper')
const paymentService = require('../../../../app/payment')

const payment1 = {
  claimId: 'MINE123',
  value: 101
}

describe('Payment service test', () => {
  beforeEach(async () => {
    await dbHelper.truncate()
  })

  afterAll(async () => {
    await dbHelper.close()
  })

  test('create creates payment', async () => {
    await paymentService.createPayment(payment1)
  })
})
