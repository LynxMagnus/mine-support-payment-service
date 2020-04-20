
const messageService = require('../../../app/modules/messaging')

describe('message service', () => {
  afterEach(async () => {
    await messageService.closeConnections()
  })
  test('smoke test', async () => {
    await messageService.registerService()
    await messageService.closeConnections()
  })
})
