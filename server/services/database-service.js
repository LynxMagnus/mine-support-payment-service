const Sequelize = require('sequelize')
const config = require('../config')

module.exports = (async function () {
  const dbConfig = config.dbConfig[config.env]
  return new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
}())
