const { createSchedule } = require('../schedule')

async function processScheduleMessage (message) {
  try {
    const scheduleStartDate = new Date()
    await createSchedule(message.body, scheduleStartDate)
    await message.complete()
  } catch (err) {
    console.error('Unable to process message:', err)
    await message.abandon()
  }
}

module.exports = processScheduleMessage
