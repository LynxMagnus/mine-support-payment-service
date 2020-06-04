
const paymentService = require('../../../server/services/payment-service')
jest.mock('../../../server/services/payment-service')

const messageAction = require('../../../server/services/payment-message-action')

describe('payment message action', () => {
  test('should call payment service create', async () => {
    const payment =
    {
      claimId: 'MINE123',
      value: 190.96
    }
    await messageAction(payment)
    expect(paymentService.create).toHaveBeenCalledTimes(1)
    expect(paymentService.create).toHaveBeenCalledWith(payment)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })
})
