const auth = require('@azure/ms-rest-nodeauth')
const { development, production, test } = require('./constants').environments

function logRetry (message) {
  console.log(message)
}

function isProd () {
  return process.env.NODE_ENV === production
}

const hooks = {
  beforeConnect: async (cfg) => {
    console.log('running beforeConnect hook')
    if (isProd()) {
      console.log('attempting to acquire MSI credentials')
      const credentials = await auth.loginWithVmMSI({ resource: 'https://ossrdbms-aad.database.windows.net' })
      console.log('credentials acquired')
      const token = await credentials.getToken()
      console.log('token acquired')
      cfg.password = token.accessToken
    }
  }
}

const retry = {
  backoffBase: 500,
  backoffExponent: 1.1,
  match: [/SequelizeConnectionError/],
  max: 10,
  name: 'connection',
  report: logRetry,
  timeout: 60000
}

const dbConfig = {
  database: process.env.POSTGRES_DB || 'ffc_demo_payment_service',
  dialect: 'postgres',
  hooks,
  host: process.env.POSTGRES_HOST || 'ffc-demo-payment-postgres',
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
  retry,
  schema: process.env.POSTGRES_SCHEMA || 'public',
  username: process.env.POSTGRES_USERNAME
}

const config = {}
config[development] = dbConfig
config[production] = dbConfig
config[test] = dbConfig

module.exports = config
