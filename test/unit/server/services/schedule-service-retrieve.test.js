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

  test('retrieveAll retrieves all payment schedules', async () => {
    const expectedSchedules = [
      {
        claimId: 'MINE001',
        paymentDates: ['2020-04-01 14:00', '2020-05-01 14:00']
      },
      {
        claimId: 'MINE002',
        paymentDates: ['2020-06-01 14:00']
      }
    ]
    const repositoryResponse = [
      {
        scheduleId: 1,
        claimId: 'MINE001',
        paymentDate: '2020-04-01 14:00'
      },
      {
        scheduleId: 2,
        claimId: 'MINE001',
        paymentDate: '2020-05-01 14:00'
      },
      {
        scheduleId: 3,
        claimId: 'MINE002',
        paymentDate: '2020-06-01 14:00'
      }
    ]

    scheduleRepository.getAll = jest.fn(() => repositoryResponse)

    const retrieveSchedules = await scheduleService.getAll()

    expect(retrieveSchedules).toEqual(expectedSchedules)
  })
})
