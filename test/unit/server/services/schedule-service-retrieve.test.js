describe('Schedule service tests', () => {
  let scheduleRepository
  let scheduleService

  beforeAll(async () => {
    jest.mock('../../../../server/repository/schedule-repository')
    scheduleRepository = require('../../../../server/repository/schedule-repository')
    scheduleService = require('../../../../server/services/schedule-service')
  })

  afterEach(async () => {
    jest.unmock('../../../../server/repository/schedule-repository')
  })

  test('getAll handles missing payment', async () => {
    const expectedSchedules = [
      {
        claimId: 'MINE001',
        paymentDate: '2020-04-01 14:00'
      },
      {
        claimId: 'MINE001',
        paymentDate: '2020-05-01 14:00'
      },
      {
        claimId: 'MINE002',
        paymentDate: '2020-06-01 14:00'
      }
    ]
    const repositoryResponse = [
      {
        claimId: 'MINE001',
        paymentDate: '2020-04-01 14:00'
      },
      {
        claimId: 'MINE001',
        paymentDate: '2020-05-01 14:00'
      },
      {
        claimId: 'MINE002',
        paymentDate: '2020-06-01 14:00'
      }
    ]

    scheduleRepository.getAll = jest.fn(() => repositoryResponse)

    const retrieveSchedules = await scheduleService.getAll()

    expect(retrieveSchedules).toEqual(expectedSchedules)
  })

  test('retrieveAll retrieves all payment schedules', async () => {
    const expectedSchedules = [
      {
        claimId: 'MINE001',
        paymentDate: '2020-04-01 14:00',
        paymentAmount: '150.00'
      },
      {
        claimId: 'MINE001',
        paymentDate: '2020-05-01 14:00',
        paymentAmount: '150.00'
      },
      {
        claimId: 'MINE002',
        paymentDate: '2020-06-01 14:00',
        paymentAmount: '55.00'
      }
    ]
    const repositoryResponse = [
      {
        claimId: 'MINE001',
        paymentDate: '2020-04-01 14:00',
        payment: { value: '150.00' }
      },
      {
        claimId: 'MINE001',
        paymentDate: '2020-05-01 14:00',
        payment: { value: '150.00' }
      },
      {
        claimId: 'MINE002',
        paymentDate: '2020-06-01 14:00',
        payment: { value: '55.00' }
      }
    ]

    scheduleRepository.getAll = jest.fn(() => repositoryResponse)

    const retrieveSchedules = await scheduleService.getAll()

    expect(retrieveSchedules).toEqual(expectedSchedules)
  })
})
