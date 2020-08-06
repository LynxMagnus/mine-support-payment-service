const dbHelper = require('../../../db-helper')
const paymentService = require('../../../../server/services/payment-service')

const payment1 = {
  claimId: 'MINE123',
  value: 101
}

const payment2 = {
  claimId: 'MINE124',
  value: 124
}

describe('Payment service test', () => {
  beforeEach(async () => {
    await dbHelper.truncate()
  })

  afterAll(async () => {
    await dbHelper.close()
  })

  test('create creates payment', async () => {
    await paymentService.create(payment1)
  })

  test('getById returns record by ID', async () => {
    await paymentService.create(payment1)
    const result = await paymentService.getById(payment1.claimId)
    expect(result.claimId).toEqual(payment1.claimId)
    expect(result.paymentAmount).toEqual('101.00')
  })

  test('getById returns undefined for unknown record', async () => {
    await paymentService.create(payment1)
    const result = await paymentService.getById('noSuchId')
    expect(result).toBeUndefined()
  })

  test('gatAll returns all records', async () => {
    await paymentService.create(payment1)
    await paymentService.create(payment2)
    const result = await paymentService.getAll()
    expect(result.length).toEqual(2)
    expect(result[0].claimId).toEqual(payment1.claimId)
    expect(result[1].claimId).toEqual(payment2.claimId)
  })
})
