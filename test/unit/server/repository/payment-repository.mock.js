const fs = require('fs')
const path = require('path')
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/payment.data.json'), 'utf8'))

module.exports = {
  getById: async function (claimId) {
    return data.payments.find(x => x.claimId === claimId)
  },
  create: async function (schedule) {
    return true
  },
  getAll: async function () {
    return data.payments
  }
}
