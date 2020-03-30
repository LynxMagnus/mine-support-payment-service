const aggregateByClaimId = require('../../../../server/services/lib/aggregateByClaimId')

describe('aggregateByClaimId', () => {
  test('empty schedule should be handled', () => {
    const result = aggregateByClaimId([])
    expect(result).toEqual([])
  })
  test('non empty schedule should be aggregated', () => {
    const scheduleList = [
      {
        scheduleId: 1,
        claimId: 'MINE001',
        paymentDate: '2020-04-01 14:00'
      },
      {
        scheduleId: 2,
        claimId: 'MINE001',
        paymentDate: '2020-05-01 14:00'
      },
      {
        scheduleId: 3,
        claimId: 'MINE002',
        paymentDate: '2020-06-01 14:00'
      }
    ]
    const expectedAggregatedSchedule = [
      {
        claimId: 'MINE001',
        paymentDates: ['2020-04-01 14:00', '2020-05-01 14:00']
      },
      {
        claimId: 'MINE002',
        paymentDates: ['2020-06-01 14:00']
      }
    ]
    const result = aggregateByClaimId(scheduleList)
    expect(result).toEqual(expectedAggregatedSchedule)
  })
})
