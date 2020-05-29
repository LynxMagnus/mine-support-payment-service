describe('database service tests', () => {
  const databaseService = require('../../../../server/services/database-service')
  const dbHelper = require('../../../db-helper')

  afterAll(async () => {
    await dbHelper.close()
  })

  test('isConnected returns true for connected database', async () => {
    const isConnected = await databaseService.isConnected()
    expect(isConnected).toEqual(true)
  })
})
