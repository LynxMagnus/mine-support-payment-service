describe('Schedule repository tests', () => {
  let scheduleRepository

  beforeEach(async () => {
    jest.mock('../../server/models', () => {})
    scheduleRepository = require('../../server/repository/schedule-repository')
  })

  afterEach(async () => {
    jest.unmock('../../server/models')
  })

  test('create function exists', async () => {
    expect(scheduleRepository.create).toBeDefined()
  })

  test('getById function exists', async () => {
    expect(scheduleRepository.getById).toBeDefined()
  })
})
