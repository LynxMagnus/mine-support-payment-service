const config = require('../../config')
module.exports = config.oktaEnabled ? require('./get-okta-credentials') : require('./get-stubbed-credentials')
