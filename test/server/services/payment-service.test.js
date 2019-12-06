describe('Payment service tests', () => {
  const mockPaymentRepository = require('../repository/payment-repository.mock')
  let paymentService

  beforeEach(async () => {
    jest.mock('../../../server/repository/payment-repository', () => mockPaymentRepository)
    paymentService = require('../../../server/services/payment-service')
  })

  afterEach(async () => {
    jest.unmock('../../../server/repository/payment-repository')
  })

  test('updateValue creates payment', async (done) => {
    const calculation = {
      claimId: 'MINE003',
      value: 100
    }
    const spy = jest.spyOn(mockPaymentRepository, 'create')

    await paymentService.create(calculation)

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
    done()
  })

  test('updateValue does not create duplicate payment', async (done) => {
    const calculation = {
      claimId: 'MINE001',
      value: 100
    }
    const spy = jest.spyOn(mockPaymentRepository, 'create')

    await paymentService.create(calculation)

    expect(spy).toHaveBeenCalledTimes(0)
    spy.mockRestore()
    done()
  })
})
