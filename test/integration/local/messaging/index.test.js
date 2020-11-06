const { start, stop } = require('../../../../app/messaging')

describe('message service', () => {
  afterAll(async () => {
    await stop()
  })

  test('runs', async () => {
    await start()
  })
})
