const Sequelize = require('sequelize')
const config = require('../config')

const dbConfig = config.dbConfig[config.env]

module.exports = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
