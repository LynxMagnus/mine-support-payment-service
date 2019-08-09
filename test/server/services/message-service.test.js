describe('Message service tests', () => {
  let mockScheduleRespository = require('../repository/schedule-repository.mock')
  let mockPaymentRepository = require('../repository/payment-repository.mock')
  let mockConnectionService = require('./connection-service.mock')
  let messageService

  beforeEach(async () => {
    jest.mock('../../../server/repository/schedule-repository', () => mockScheduleRespository)
    jest.mock('../../../server/repository/payment-repository', () => mockPaymentRepository)
    jest.mock('../../../server/services/connection-service', () => mockConnectionService)
    messageService = require('../../../server/services/message-service')
  })

  afterEach(async () => {
    jest.unmock('../../../server/repository/schedule-repository')
    jest.unmock('../../../server/repository/payment-repository')
    jest.unmock('../../../server/services/connection-service')
  })

  test('setupReceivers sets up payment', async () => {
    const spy = jest.spyOn(mockConnectionService, 'setupConnection')

    await messageService.setupConnections()

    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
  })

  test('setupReceivers opens connections', async () => {
    const spy = jest.spyOn(mockConnectionService, 'openConnection')

    await messageService.setupConnections()

    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
  })

  test('setupReceivers sets up receivers', async () => {
    const spy = jest.spyOn(mockConnectionService, 'setupReceiver')

    await messageService.setupConnections()

    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
  })
})
