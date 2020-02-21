const { Consumer } = require('sqs-consumer')
const AWS = require('aws-sdk')

class MessageConsumer {
  constructor (queueConfig, queueUrl, messageHandler) {
    // this.createConsumer(queueConfig, queueUrl, messageHandler)
    // this.registerErrorEvents()
    this.test(queueConfig, queueUrl)
  }

  test (queueConfig, queueUrl) {
    const sts = new AWS.STS({ region: 'eu-west-2' })
    sts.getCallerIdentity({}, function (error, data) {
      if (error) {
        console.log(error)
      }
      console.log(data)
    })

    var sqs = new AWS.SQS({ region: 'eu-west-2' })

    var params = {
      AttributeNames: [
        'SentTimestamp'
      ],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: [
        'All'
      ],
      QueueUrl: queueUrl,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0
    }

    sqs.receiveMessage(params, function (err, data) {
      if (err) {
        console.log('Receive Error', err)
      } else if (data.Messages) {
        var deleteParams = {
          QueueUrl: queueUrl,
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

  createConsumer (queueConfig, queueUrl, messageAction) {
    this.app = Consumer.create({
      queueUrl,
      handleMessage: messageAction,
      sqs: new AWS.SQS({
        region: queueConfig.region
      })
    })
    console.log(this.app.sqs)
  }

  registerErrorEvents () {
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

  handleError (err) {
    console.error(err.message)
  }

  start () {
    this.app.start()
    console.log('message polling started')
  }

  stop () {
    this.app.stop()
  }
}

module.exports = MessageConsumer
