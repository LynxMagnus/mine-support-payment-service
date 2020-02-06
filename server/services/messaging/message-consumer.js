const {Consumer} = require('sqs-consumer')
const AWS = require('aws-sdk')

class MessageConsumer {
  constructor(queueConfig, queueUrl, messageHandler) {
    // this.createConsumer(queueConfig, queueUrl, messageHandler)
    // this.registerErrorEvents()
    this.test(queueConfig, queueUrl)
  }

  test(queueConfig, queueUrl) {
    var AWS = require('aws-sdk')
    // Set the region
    // AWS.config.update({
    //   // region: queueConfig.region,
    //   // accessKeyId: queueConfig.accessKeyId,
    //   // secretAccessKey: queueConfig.secretAccessKey
    // })


    // Create an SQS service object
    var sqs = new AWS.SQS({
      // accessKeyId: queueConfig.accessKeyId,
      // secretAccessKey: queueConfig.secretAccessKey
      credentialProvider: new AWS.CredentialProviderChain()
    })

    var queueURL = queueUrl

    var params = {
      AttributeNames: [
        'SentTimestamp'
      ],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: [
        'All'
      ],
      QueueUrl: queueURL,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0
    }

    sqs.receiveMessage(params, function (err, data) {
      if (err) {
        console.log('Receive Error', err)
      } else if (data.Messages) {
        var deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: data.Messages[0].ReceiptHandle
        }
        sqs.deleteMessage(deleteParams, function (err, data) {
          if (err) {
            console.log('Delete Error', err)
          } else {
            console.log('Message Deleted', data)
          }
        })
      }
    })
  }

  createConsumer(queueConfig, queueUrl, messageAction) {
    this.app = Consumer.create({
      queueUrl,
      handleMessage: messageAction,
      sqs: new AWS.SQS({
        region: queueConfig.region
      })
    })
    console.log(this.app.sqs)
  }

  registerErrorEvents() {
    const _this = this
    this.app.on('error', (err) => {
      _this.handleError(err)
    })

    this.app.on('processing_error', (err) => {
      _this.handleError(err)
    })

    this.app.on('timeout_error', (err) => {
      _this.handleError(err)
    })
  }

  handleError(err) {
    console.error(err.message)
  }

  start() {
    this.app.start()
    console.log('message polling started')
  }

  stop() {
    this.app.stop()
  }
}

module.exports = MessageConsumer
