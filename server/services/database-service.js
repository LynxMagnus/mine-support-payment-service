const db = require('../models')

module.exports = {
  isConnected: function () {
    try {
      db.query('SELECT 1', { type: db.QueryTypes.SELECT })
        .then(result => {
          return true
        })
    } catch (err) {
      return false
    }
  }
}
