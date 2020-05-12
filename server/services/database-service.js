// const db = require('../models')

module.exports = {
  isConnected: async function () {
    return true
    // try {
    //   await db.sequelize.authenticate()
    //   return true
    // } catch (err) {
    //   console.log(err)
    //   return false
    // }
  }
}
