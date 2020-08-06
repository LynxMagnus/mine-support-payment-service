const scheduleService = require('../../../server/services/schedule-service')
jest.mock('../../../server/services/schedule-service')

const messageAction = require('../../../server/services/schedule-message-action')

describe('schedule message action', () => {
  test('should call schedule service create with claim and date', async () => {
    const claim =
    {
      claimId: 'MINE123'
    }
    await messageAction(claim)
    expect(scheduleService.create).toHaveBeenCalledTimes(1)
    expect(scheduleService.create).toHaveBeenCalledWith(claim, expect.any(Date))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
