const scheduling = require('../../scheduling')

async function scheduleMessageAction (message) {
  try {
    console.log('message received - schedule ', message.Body)
    const claim = JSON.parse(message.Body)
    await scheduling.create(claim, new Date())
  } catch (ex) {
    console.error('unable to process message ', ex)
  }
}

module.exports = { scheduleMessageAction }
