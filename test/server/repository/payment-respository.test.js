describe('Payment repository tests', () => {
  const mockDb = require('./index.mock')
  let paymentRepository

  beforeEach(async () => {
    jest.mock('../../../server/models', () => mockDb)
    paymentRepository = require('../../../server/repository/payment-repository')
  })

  afterEach(async () => {
    jest.unmock('../../../server/models')
  })

  test('create function creates', async (done) => {
    const calculation = {
      claimId: 'MINE123',
      value: 100
    }

    const spy = jest.spyOn(mockDb.payment, 'upsert')

    await paymentRepository.create(calculation)

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
    done()
  })

  test('create function logs error', async (done) => {
    const spy = jest.spyOn(global.console, 'log')

    try {
      await paymentRepository.create()
    } catch (err) {}

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
    done()
  })

  test('getById calls findOne', async (done) => {
    const spy = jest.spyOn(mockDb.payment, 'findOne')

    await paymentRepository.getById('MINE123')

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
    done()
  })
})
