const config = require('../../../app/config')
const MessageReceiver = require('../../../app/messaging/message-receiver')
jest.mock('../../../server/services/messaging/message-receiver')

describe('message service', () => {
  const createMessageService = require('../../../app/services/message-service')
  let messageService

  beforeAll(async () => {
    messageService = await createMessageService()
  })

  test('MessageService should create a MessageReceiver for schedule and payment queues', async () => {
    expect(MessageReceiver).toHaveBeenCalledTimes(2)
    expect(MessageReceiver).toHaveBeenNthCalledWith(1, 'payment-queue-receiver', config.paymentQueue, undefined, expect.any(Function))
    expect(MessageReceiver).toHaveBeenNthCalledWith(2, 'schedule-queue-receiver', config.scheduleQueue, undefined, expect.any(Function))
  })

  test('close connections calls closeConnection on both receivers', async () => {
    await messageService.closeConnections()
    const paymentReceiveInstance = MessageReceiver.mock.instances[0]
    expect(paymentReceiveInstance.closeConnection).toHaveBeenCalledTimes(1)
    const scheduleReceiveInstance = MessageReceiver.mock.instances[1]
    expect(scheduleReceiveInstance.closeConnection).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    jest.resetAllMocks()
  })
})
