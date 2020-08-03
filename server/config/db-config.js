const dbConfig = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  schema: process.env.POSTGRES_SCHEMA || 'public',
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
