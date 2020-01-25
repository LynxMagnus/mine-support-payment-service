const scheduleService = require('./schedule-service')

async function scheduleMessageAction (message) {
  try {
    console.log('message received - schedule ', message.Body)
    const claim = JSON.parse(message.Body)
    await scheduleService.create(claim)
  } catch (ex) {
    console.error('unable to process message ', ex)
  }
}

module.exports = { scheduleMessageAction }
