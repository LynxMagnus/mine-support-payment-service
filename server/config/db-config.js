const dbConfig = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || 'mine_payments',
  schema: 'pr53',
  host: process.env.POSTGRES_HOST || 'ffc-demo-payment-postgres',
  // username: 'test',
  // password: '',
  // database: 'testdb',
  // schema: 'pr53', // SequelizeMeta ends up in this schema not in public
  // host: 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  dialect: 'postgres'
}

const config = {
  development: dbConfig,
  production: dbConfig,
  test: dbConfig
}

module.exports = config
