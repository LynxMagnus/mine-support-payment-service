const data = {
  schedules:
  [
    {
      claimId: 'MINE001',
      paymentDate: '2020-02-02T02:02:02+00:00'
    },
    {
      claimId: 'MINE001',
      paymentDate: '2020-03-30T13:53:10+01:00'
    },
    {
      claimId: 'MINE002',
      paymentDate: '2020-01-01T16:53:10+00:00'
    }
  ]
}

module.exports = {
  getById: async function (claimId) {
    return data.schedules.filter(x => x.claimId === claimId)
  },
  create: async function (schedule) {
    return true
  },
  getAll: async function () {
    return data.schedules
  }
}
