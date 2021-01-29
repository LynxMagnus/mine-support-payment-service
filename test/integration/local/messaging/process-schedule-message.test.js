const dbHelper = require('../../../db-helper')
const processScheduleMessage = require('../../../../app/messaging/process-schedule-message')
const { models } = require('../../../../app/services/database-service')

describe('processing claim message', () => {
  const message = {
    body: {
      claimId: 'MINE1'
    }
  }

  const receiver = {
    completeMessage: jest.fn(),
    abandonMessage: jest.fn()
  }

  beforeEach(async () => {
    await dbHelper.truncate()
  })

  afterEach(async () => {
    await dbHelper.truncate()
  })

  afterAll(async () => {
    await dbHelper.close()
  })

  test('should save valid claim', async () => {
    await processScheduleMessage(message, receiver)
    const schedule = await models.schedule.findAll({ where: { claimId: message.body.claimId }, raw: true })
    expect(schedule.length).toBe(6)
  })

  test('should not save duplicate claim', async () => {
    await processScheduleMessage(message, receiver)
    await processScheduleMessage(message, receiver)
    const schedule = await models.schedule.findAll({ where: { claimId: message.body.claimId }, raw: true })
    expect(schedule.length).toBe(6)
  })

  test('should complete valid claim', async () => {
    await processScheduleMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalled()
  })

  test('should abandon invalid claim', async () => {
    message.body = 'not a claim'
    await processScheduleMessage(message, receiver)
    expect(receiver.abandonMessage).toHaveBeenCalled()
  })
})
