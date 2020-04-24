describe('Payment service tests', () => {
  let paymentRepository
  let paymentService

  beforeAll(() => {
    jest.mock('../../../../server/repository/payment-repository')
    paymentRepository = require('../../../../server/repository/payment-repository')
    paymentService = require('../../../../server/services/payment-service')
  })

  test('getAll retrieves all payments', async () => {
    const expectedResults = [
      {
        claimId: 'MINE123',
        paymentAmount: '150.50',
        schedule: [
          '2020-03-01 14:00',
          '2020-04-01 14:00'
        ]
      },
      {
        claimId: 'MINE124',
        paymentAmount: '50.75',
        schedule: [
          '2020-05-01 14:00'
        ]
      }
    ]
    const repositoryResponse = [
      {
        claimId: 'MINE123',
        value: '150.50',
        schedules: [
          { paymentDate: '2020-03-01 14:00' },
          { paymentDate: '2020-04-01 14:00' }
        ]
      },
      {
        claimId: 'MINE124',
        value: '50.75',
        schedules: [
          { paymentDate: '2020-05-01 14:00' }
        ]
      }
    ]

    paymentRepository.getAll = jest.fn(() => repositoryResponse)

    const payments = await paymentService.getAll()

    expect(payments).toEqual(expectedResults)
  })
})
