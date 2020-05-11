const routes = [].concat(
  require('../routes/payment'),
  require('../routes/schedule'),
  require('../routes/secret'),
  require('../routes/healthy'),
  require('../routes/healthz')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
