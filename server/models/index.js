'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/db-config.js'))[env]
const db = {}

let sequelize

function setupSequelise () {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config)
  }

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      const model = sequelize.import(path.join(__dirname, file))
      db[model.name] = model
    })

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })
}

const watchFilename = '/home/node/config/postgresUsername'

fs.watchFile(watchFilename, { interval: 1000 }, async (curr, prev) => {
  const username = fs.readFileSync(watchFilename, 'utf8')
  console.log(`Changing username to ${username}`)
  config.username = username
  await sequelize.close()
  setupSequelise()
})

// let fsWait = false

// fs.watch(watchDir, (event, filename) => {
//   if (filename) {
//     if (fsWait) return

//     fsWait = setTimeout(() => {
//       fsWait = false
//     }, 100)

//     const username = fs.readFileSync(watchDir + filename, 'utf8')
//     console.log(`Changing username to ${username}`)

//     // config.username = username

//     // sequelize.close()
//     // setupSequelise()
//   }
// })

setupSequelise()

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
