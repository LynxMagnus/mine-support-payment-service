
const messageService = require('../../../server/services/message-service')
const config = require('../../../server/config')
const scheduleMessageAction = require('../../../server/services/schedule-message-action')
const paymentMessageAction = require('../../../server/services/payment-message-action')

const MessageConsumer = require('../../../server/services/messaging/message-consumer')
jest.mock('../../../server/services/messaging/message-consumer')

const createQueue = require('../../../server/services/messaging/create-queue')
jest.mock('../../../server/services/messaging/create-queue')

describe('message service', () => {
  test('registerService queues created on startup', async () => {
    await messageService.registerService()
    expect(createQueue).toHaveBeenCalledTimes(2)
    expect(createQueue).toHaveBeenCalledWith('schedule', config.scheduleQueueConfig)
    expect(createQueue).toHaveBeenCalledWith('payment', config.paymentQueueConfig)
  })

  test('register service creates and starts consumers for schedule and payment queues with correct configs', async () => {
    await messageService.registerService()
    // expect consumers to be created
    expect(MessageConsumer).toHaveBeenCalledTimes(2)
    expect(MessageConsumer).toHaveBeenCalledWith(config.scheduleQueueConfig, config.scheduleQueueConfig.queueUrl, scheduleMessageAction)
    expect(MessageConsumer).toHaveBeenCalledWith(config.paymentQueueConfig, config.paymentQueueConfig.queueUrl, paymentMessageAction)
    // expect consumers to be started
    const scheduleConsumerInstance = MessageConsumer.mock.instances[0]
    expect(scheduleConsumerInstance.start).toHaveBeenCalledTimes(1)
    const paymentConsumerInstance = MessageConsumer.mock.instances[1]
    expect(paymentConsumerInstance.start).toHaveBeenCalledTimes(1)
  })

  test('isRunning returns true if consumers are both running', async () => {
    await messageService.registerService()
    const scheduleConsumerInstance = MessageConsumer.mock.instances[0]
    const paymentConsumerInstance = MessageConsumer.mock.instances[1]
    // expect service to be running if consumers not stopped
    scheduleConsumerInstance.stopped = false
    paymentConsumerInstance.stopped = false
    expect(messageService.isRunning()).toEqual(true)
  })

  test('isRunning returns false if a consumer is stopped', async () => {
    await messageService.registerService()
    const scheduleConsumerInstance = MessageConsumer.mock.instances[0]
    const paymentConsumerInstance = MessageConsumer.mock.instances[1]
    // expect service to be running if consumers not stopped
    scheduleConsumerInstance.stopped = false
    paymentConsumerInstance.stopped = true
    expect(messageService.isRunning()).toEqual(false)
  })

  test('close connections calls stop on both consumers', async () => {
    await messageService.registerService()
    messageService.closeConnections()
    const scheduleConsumerInstance = MessageConsumer.mock.instances[0]
    expect(scheduleConsumerInstance.stop).toHaveBeenCalledTimes(1)
    const paymentConsumerInstance = MessageConsumer.mock.instances[1]
    expect(paymentConsumerInstance.stop).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })
})
