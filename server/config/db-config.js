const fs = require('fs')

const dbConfig = {
  username: fs.readFileSync('/home/node/config/postgresUsername', 'utf8'),
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || 'mine_payments',
  host: process.env.POSTGRES_HOST || 'ffc-demo-payment-postgres',
  port: process.env.POSTGRES_PORT || 5432,
  dialect: 'postgres'
}

const config = {
  development: dbConfig,
  production: dbConfig,
  test: dbConfig
}

module.exports = config
