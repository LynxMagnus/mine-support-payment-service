const dbConfig = {
  database: process.env.POSTGRES_DB || 'ffc_demo_payment_service',
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST || 'ffc-demo-payment-postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USERNAME
}

const config = {
  development: dbConfig,
  production: dbConfig,
  test: dbConfig
}

module.exports = config
