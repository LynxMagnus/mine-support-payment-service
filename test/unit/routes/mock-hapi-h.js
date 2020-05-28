class MockHapiH {
  response (data) {
    return {
      code: (code) => {
        this.data = data
        this.code = code
      }
    }
  }
}

module.exports = MockHapiH
