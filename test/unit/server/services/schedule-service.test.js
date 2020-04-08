describe('Schedule service tests', () => {
  const mockScheduleRespository = require('../repository/schedule-repository.mock')
  let scheduleService

  beforeEach(async () => {
    jest.mock('../../../../server/repository/schedule-repository', () => mockScheduleRespository)
    scheduleService = require('../../../../server/services/schedule-service')
  })

  afterEach(async () => {
    jest.unmock('../../../../server/repository/schedule-repository')
  })

  test('create creates all payment schedules', async (done) => {
    const claim = {
      claimId: 'MINE003'
    }
    const spy = jest.spyOn(mockScheduleRespository, 'create')
    const startDate = new Date(2020, 3, 7)
    await scheduleService.create(claim, startDate)

    expect(spy).toHaveBeenCalledTimes(6)
    expect(spy).toHaveBeenCalledWith({ claimId: claim.claimId, paymentDate: new Date(2020, 4, 1) })
    expect(spy).toHaveBeenCalledWith({ claimId: claim.claimId, paymentDate: new Date(2020, 5, 1) })
    expect(spy).toHaveBeenCalledWith({ claimId: claim.claimId, paymentDate: new Date(2020, 6, 1) })
    expect(spy).toHaveBeenCalledWith({ claimId: claim.claimId, paymentDate: new Date(2020, 7, 1) })
    expect(spy).toHaveBeenCalledWith({ claimId: claim.claimId, paymentDate: new Date(2020, 8, 1) })
    expect(spy).toHaveBeenCalledWith({ claimId: claim.claimId, paymentDate: new Date(2020, 9, 1) })
    spy.mockRestore()
    done()
  })

  test('create does not created schedule if already exists', async (done) => {
    const claim = {
      claimId: 'MINE001'
    }
    const spy = jest.spyOn(mockScheduleRespository, 'create')

    await scheduleService.create(claim)

    expect(spy).toHaveBeenCalledTimes(0)
    spy.mockRestore()
    done()
  })
})
