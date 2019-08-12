const dbConfig = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || 'mine_payments',
  host: process.env.POSTGRES_HOST || 'mine-support-postgres-payments',
  port: process.env.POSTGRES_PORT || 5432,
  dialect: 'postgres'
}

const config = {
  production: dbConfig,
  development: dbConfig
}

module.exports = config
