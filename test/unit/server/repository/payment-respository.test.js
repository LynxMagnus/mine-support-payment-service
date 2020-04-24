describe('Payment repository tests', () => {
  const mockDb = require('./index.mock')
  let paymentRepository

  beforeAll(() => {
    jest.mock('../../../../server/models', () => mockDb)
    paymentRepository = require('../../../../server/repository/payment-repository')
  })

  test('create function creates', async () => {
    const calculation = {
      claimId: 'MINE123',
      value: 100
    }

    const spy = jest.spyOn(mockDb.payment, 'upsert')

    await paymentRepository.create(calculation)

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test('create function logs error', async () => {
    const spy = jest.spyOn(global.console, 'log')

    try {
      await paymentRepository.create()
    } catch (err) {}

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test('getById calls findOne', async () => {
    const spy = jest.spyOn(mockDb.payment, 'findOne')

    await paymentRepository.getById('MINE123')

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
