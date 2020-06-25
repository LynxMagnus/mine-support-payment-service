const createServer = require('./server')

require('./server/services/app-insights').setup()

createServer()
  .then(server => server.start())
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
