const config = {
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: 'mine_payments',
    host: 'mine-support-postgres-payments',
    port: 5432,
    dialect: 'postgres'
  },
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: 'mine_payments',
    host: 'mine-support-postgres-payments',
    port: 5432,
    dialect: 'postgres'
  }
}

module.exports = config
