module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      return {
        message: 'ffc demo payment service'
      }
    }
  }
}
