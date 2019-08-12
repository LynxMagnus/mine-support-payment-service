describe('Schedule repository tests', () => {
  let mockDb = require('./index.mock')
  let scheduleRepository

  beforeEach(async () => {
    jest.mock('../../../server/models', () => mockDb)
    scheduleRepository = require('../../../server/repository/schedule-repository')
  })

  afterEach(async () => {
    jest.unmock('../../../server/models')
  })

  test('create function creates', async () => {
    const schedule = {
      claimId: 'MINE123',
      paymentDate: new Date()
    }

    const spy = jest.spyOn(mockDb.schedule, 'upsert')

    await scheduleRepository.create(schedule)

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test('create function logs error', async () => {
    const spy = jest.spyOn(global.console, 'log')

    try {
      await scheduleRepository.create()
    } catch (err) {}

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test('getById calls findAll', async () => {
    const spy = jest.spyOn(mockDb.schedule, 'findAll')

    await scheduleRepository.getById('MINE123')

    expect(spy).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})