describe('Payment service tests', () => {
  const mockPaymentRepository = require('../repository/payment-repository.mock')
  let paymentService

  beforeEach(() => {
    jest.mock('../../../../server/repository/payment-repository', () => mockPaymentRepository)
    paymentService = require('../../../../server/services/payment-service')
  })

  test('updateValue creates payment', async () => {
    const calculation = {
      claimId: 'MINE003',
      value: 100
    }
    const spy = jest.spyOn(mockPaymentRepository, 'create')

    await paymentService.create(calculation)

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test('updateValue does not create duplicate payment', async () => {
    const calculation = {
      claimId: 'MINE001',
      value: 100
    }
    const spy = jest.spyOn(mockPaymentRepository, 'create')

    await paymentService.create(calculation)

    expect(spy).toHaveBeenCalledTimes(0)
    spy.mockRestore()
  })
})
