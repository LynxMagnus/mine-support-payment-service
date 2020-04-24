describe('Process Error plugin tests', () => {
  const processErrorResponse = require('../../../server/plugins/process-error-response')

  test('processErrorResponse returns 404 response', () => {
    const request = {
      response: {
        output: {
          statusCode: 404
        }
      }
    }

    const response = processErrorResponse(request)
    expect(response).toStrictEqual(request.response)
  })

  test('processErrorResponse returns 404 response', () => {
    const request = {
      response: {
        output: {
          statusCode: 500
        }
      },
      log: function (message, data) {}
    }

    const response = processErrorResponse(request)
    expect(response).toStrictEqual(request.response)
  })
})
