function sqsMessageHandler (handler) {
  return (message) => {
    message.Body = JSON.stringify(message.contents)
    return handler(message)
  }
}

module.exports = sqsMessageHandler
