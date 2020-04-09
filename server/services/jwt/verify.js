const config = require('../../config')
module.exports = config.oktaEnabled ? require('./verify-okta-access-token') : require('./verify-stub-access-token')
