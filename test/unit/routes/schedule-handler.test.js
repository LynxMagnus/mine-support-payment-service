const MockHapiH = require('./mock-hapi-h')

const scheduleService = require('../../../server/services/schedule-service')
jest.mock('../../../server/services/schedule-service')
const scheduleHandler = require('../../../server/routes/schedule-handler')

describe('schedule handler', () => {
  test('getClaim returns 404 and "not found" message for unknown claim', async () => {
    // arrange
    const h = new MockHapiH()
    const noClaimResult = []
    scheduleService.getById.mockReturnValueOnce(noClaimResult)
    // act
    const request = { params: { id: 'noSuchClaim' } }
    await scheduleHandler.getClaim(request, h)
    // assert
    expect(h.data).toEqual('Claim id not found')
    expect(h.code).toEqual(404)
  })

  test('getClaim returns 200 and claim data as an array', async () => {
    // arrange
    const h = new MockHapiH()
    const validClaimResult = [
      {
        claimId: 'MINE123',
        paymentDate: '2020-11-01T15:00:00.990Z',
        paymentAmount: '190.96'
      }
    ]
    scheduleService.getById.mockReturnValueOnce(validClaimResult)
    // act
    const request = { params: { id: 'claim001' } }
    await scheduleHandler.getClaim(request, h)
    // assert
    expect(h.data).toEqual(validClaimResult)
    expect(h.code).toEqual(200)
  })

  test('getClaims returns 200 and claim data as an array', async () => {
    // arrange
    const h = new MockHapiH()
    const validClaimResult = [
      {
        claimId: 'MINE123',
        paymentDate: '2020-11-01T15:00:00.990Z',
        paymentAmount: '190.96'
      },
      {
        claimId: 'MINE124',
        paymentDate: '2020-10-01T15:00:00.990Z',
        paymentAmount: '190.96'
      }
    ]
    scheduleService.getAll.mockReturnValueOnce(validClaimResult)
    // act
    const request = { }
    await scheduleHandler.getClaims(request, h)
    // assert
    expect(h.data).toEqual(validClaimResult)
    expect(h.code).toEqual(200)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    jest.resetAllMocks()
  })
})
