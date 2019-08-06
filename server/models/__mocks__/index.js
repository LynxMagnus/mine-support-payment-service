const db = {}

const Sequelize = require('sequelize')
jest.mock('sequelize', () => {
  const mockSequelize = require('sequelize-mock')
  return mockSequelize
})
let sequelize = new Sequelize()
const schedule = require('../schedule')

db.sequelize = sequelize
db.Sequelize = Sequelize
db[schedule.name] = schedule
module.exports = db
