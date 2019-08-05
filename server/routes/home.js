module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      return {
        message: 'mine support payment service'
      }
    }
  }
}
