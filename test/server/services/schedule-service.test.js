describe('Schedule service tests', () => {
  let mockScheduleRespository = require('../repository/schedule-repository.mock')
  let scheduleService

  beforeEach(async () => {
    jest.mock('../../../server/repository/schedule-repository', () => mockScheduleRespository)
    scheduleService = require('../../../server/services/schedule-service')
  })

  afterEach(async () => {
    jest.unmock('../../../server/repository/schedule-repository')
  })

  test('create creates all payment schedules', async () => {
    const claim = {
      claimId: 'MINE003'
    }
    const spy = jest.spyOn(mockScheduleRespository, 'create')

    await scheduleService.create(claim)

    expect(spy).toHaveBeenCalledTimes(6)
    spy.mockRestore()
  })

  test('create does not created schedule if already exists', async () => {
    const claim = {
      claimId: 'MINE001'
    }
    const spy = jest.spyOn(mockScheduleRespository, 'create')

    await scheduleService.create(claim)

    expect(spy).toHaveBeenCalledTimes(0)
    spy.mockRestore()
  })
})
