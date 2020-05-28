const MockHapiH = require('./mock-hapi-h')

const paymentService = require('../../../server/services/payment-service')
jest.mock('../../../server/services/payment-service')
const paymentHandler = require('../../../server/routes/payment-handler')

describe('payment handler', () => {
  test('getPayment returns 200 and payment data', async () => {
    // arrange
    const h = new MockHapiH()
    const validPaymentResult = {
      claimId: 'MINE123',
      paymentAmount: '101.00',
      schedule: [
        '2020-06-01T14:52:48.257Z',
        '2020-07-01T14:52:48.257Z',
        '2020-08-01T14:52:48.257Z',
        '2020-09-01T14:52:48.257Z', '2020-10-01T14:52:48.257Z',
        '2020-11-01T14:52:48.257Z'
      ]
    }

    paymentService.getById = jest.fn().mockReturnValueOnce(validPaymentResult)
    // act
    const request = { params: { id: 'claim001' } }
    await paymentHandler.getPayment(request, h)
    // assert
    expect(h.data).toEqual(validPaymentResult)
    expect(h.code).toEqual(200)
  })
  test('getPayments returns 200 and payments as array', async () => {
    // arrange
    const h = new MockHapiH()
    const validPaymentResults = [
      {
        claimId: 'MINE123',
        paymentAmount: '101.00',
        schedule: [
          '2020-06-01T14:52:48.257Z',
          '2020-07-01T14:52:48.257Z',
          '2020-08-01T14:52:48.257Z',
          '2020-09-01T14:52:48.257Z',
          '2020-10-01T14:52:48.257Z',
          '2020-11-01T14:52:48.257Z']
      },
      {
        claimId: 'MINE124',
        paymentAmount: '124.00',
        schedule: []
      }]

    paymentService.getAll = jest.fn().mockReturnValueOnce(validPaymentResults)
    // act
    const request = {}
    await paymentHandler.getPayments(request, h)
    // assert
    expect(h.data).toEqual(validPaymentResults)
    expect(h.code).toEqual(200)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    jest.resetAllMocks()
  })
})
