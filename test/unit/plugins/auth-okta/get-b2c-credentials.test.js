
const config = require('../../../../server/config')
const getB2cConfig = require('../../../../server/config/get-b2c-config')

const validToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6InRlc3Qta2V5aWQifQ.eyJpc3MiOiJodHRwczovL3Rlc3QvdjIuMC8iLCJleHAiOjE1ODg3NjY1MzksIm5iZiI6MTU4ODc2MjkzOSwiYXVkIjoidGVzdC1jbGllbnQtaWQiLCJzY29wZSI6WyJmZmMtZGVtby5wYXltZW50cy5yZWFkIiwiZmZjLWRlbW8ucGF5bWVudHMucmVhZC5zZWxmIl0sInNjcCI6WyJmZmMtZGVtby5wYXltZW50cy5yZWFkIiwiZmZjLWRlbW8ucGF5bWVudHMucmVhZC5zZWxmIl0sImdpdmVuTmFtZSI6IkdpdmVuIiwic3VybmFtZSI6IlN1ciIsInN1YiI6InN1YiIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiYXpwIjoiMzQ3NDJiNjktMWU0ZS00Y2IyLWE5OGItNGU0YjA2NDY0OTI2IiwidmVyIjoiMS4wIiwiaWF0IjoxNTg4NzYyOTM5fQ.qQ_d0Rf5KdP7qbr9vmMebbHZjtdsSsYo2jy7D79POBQ'
describe('get b2c credentials', () => {
  beforeAll(() => {
    config.b2c = getB2cConfig()
  })
  afterAll(() => {
    delete config.b2c
  })
  test('decodes a valid token with correct audience and scopes', () => {
    const getB2cCredentials = require('../../../../server/plugins/auth/get-b2c-credentials')
    const validHeader = `Bearer ${validToken}`
    const credentials = getB2cCredentials(validHeader)
    expect(credentials).toBeDefined()
  })
})
