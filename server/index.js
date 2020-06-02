const hapi = require('@hapi/hapi')
const config = require('./config')
const messageService = require('./services/message-service')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  // Register the plugins
  await server.register(require('./plugins/auth'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))

  if (config.isDev) {
    await server.register(require('blipp'))
    await server.register(require('./plugins/logging'))
  }

  await messageService.registerService()

  process.on('SIGTERM', function () {
    messageService.closeConnections()
    process.exit(0)
  })

  process.on('SIGINT', function () {
    messageService.closeConnections()
    process.exit(0)
  })

  return server
}

module.exports = createServer
