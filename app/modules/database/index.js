const db = require('../../models')

async function isConnected () {
  try {
    await db.sequelize.authenticate()
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

module.exports = {
  isConnected
}
