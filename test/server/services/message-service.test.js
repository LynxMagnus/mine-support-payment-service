describe('Message service tests', () => {
  const mockScheduleRespository = require('../repository/schedule-repository.mock')
  const mockPaymentRepository = require('../repository/payment-repository.mock')
  const mockConnectionService = require('./connection-service.mock')
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

  test('setupReceivers sets up payment', async (done) => {
    const spy = jest.spyOn(mockConnectionService, 'setupConnection')

    await messageService.setupConnections()

    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
    done()
  })

  test('setupReceivers opens connections', async (done) => {
    const spy = jest.spyOn(mockConnectionService, 'openConnection')

    await messageService.setupConnections()

    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
    done()
  })

  test('setupReceivers sets up receivers', async (done) => {
    const spy = jest.spyOn(mockConnectionService, 'setupReceiver')

    await messageService.setupConnections()

    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
    done()
  })
})
