const fs = require('fs')
const path = require('path')
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/schedule.data.json'), 'utf8'))

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
