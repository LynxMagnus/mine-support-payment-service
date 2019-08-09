describe('Payment repository tests', () => {
  let paymentRepository

  beforeEach(async () => {
    jest.mock('../../../server/models', () => {})
    paymentRepository = require('../../../server/repository/payment-repository')
  })

  afterEach(async () => {
    jest.unmock('../../../server/models')
  })

  test('create function exists', async () => {
    expect(paymentRepository.create).toBeDefined()
  })

  test('getById function exists', async () => {
    expect(paymentRepository.getById).toBeDefined()
  })
})
