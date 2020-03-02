const dbConfig = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || 'mine_payments',
  schema: process.env.POSTGRES_SCHEMA || '',
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
