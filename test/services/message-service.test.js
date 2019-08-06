describe('Message service tests', () => {
  let mockScheduleRespository = require('../repository/schedule-repository.mock')
  let messageService

  beforeEach(async () => {
    jest.mock('../../server/repository/schedule-repository', () => mockScheduleRespository)
    messageService = require('../../server/services/message-service')
  })

  afterEach(async () => {
    jest.unmock('../../server/repository/schedule-repository')
  })

  test('setupReceivers sets up both receivers', async () => {
    const spy = jest.spyOn(messageService, 'setupConnection')

    await messageService.setupReceivers()

    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
  })
})
