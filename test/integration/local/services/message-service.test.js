const dbHelper = require('../../db-helper')
const asbHelper = require('../../asb-helper')
const messageService = require('../../../server/services/message-service')

const generateSampleClaim = () => ({
  email: 'test@test.com',
  claimId: 'MINE123',
  propertyType: 'business',
  accessible: false,
  dateOfSubsidence: new Date(),
  mineType: ['gold', 'iron']
})

describe.only('Test message service', () => {
  beforeAll(async () => {
    await asbHelper.clearAllQueues()
  }, 30000)

  beforeEach(async () => {
    await dbHelper.truncate()
    jest.restoreAllMocks()
  })

  afterAll(async () => {
    await asbHelper.clearAllQueues()
    dbHelper.close()
  }, 30000)

  test('Message service sends the payment to schedule queue', async () => {
    const message = generateSamplePayment()
    const scheduleSender = messageService.getScheduleSender()
    const spy = jest.spyOn(scheduleSender, 'sendMessage')

    await messageService.publishPayment(message)
    await expect(spy).toHaveBeenCalledTimes(1)
    await expect(spy).toHaveBeenCalledWith(message)
  })

  })
