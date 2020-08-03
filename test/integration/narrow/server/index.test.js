// describe('Server tests', () => {
//   let createServer
//   let server

//   jest.mock('@azure/service-bus')
//   jest.mock('@azure/ms-rest-nodeauth')

//   beforeAll(async () => {
//     const { sbc } = require('@azure/service-bus')
//     sbc.createFromConnectionString.mockReturnValue()
//     jest.mock('../../server/services/message-service')
//     const ms = await require('../../server/services/message-service')
//     ms
//   })

//   test('createServer returns server', async () => {
//     jest.mock('../../../../server/config', () => {
//       return {
//         isProd: false,
//         paymentQueue: {
//           address: 'some-address',
//           host: 'localhost',
//           username: 'username',
//           password: 'password'
//         },
//         scheduleQueue: {
//           address: 'some-address',
//           host: 'localhost',
//           username: 'username',
//           password: 'password'
//         },
//         port: 3004,
//         env: 'production'
//       }
//     })

//     createServer = require('../../../../server')
//     server = await createServer()
//     await server.initialize()

//     expect(server).toBeDefined()
//     jest.unmock('../../../../server/config')
//   })

//   test('createServer returns server in development', async () => {
//     jest.mock('../../../../server/config', () => {
//       return {
//         isProd: false,
//         paymentQueue: {
//           address: 'some-address',
//           host: 'localhost',
//           username: 'username',
//           password: 'password'
//         },
//         scheduleQueue: {
//           address: 'some-address',
//           host: 'localhost',
//           username: 'username',
//           password: 'password'
//         },
//         port: 3004,
//         isDev: true
//       }
//     })

//     createServer = require('../../../../server')
//     server = await createServer()
//     await server.initialize()

//     expect(server).toBeDefined()
//     jest.unmock('../../../../server/config')
//   })
// })

describe('Server tests', () => {
  let createServer
  let server

  test('createServer returns server', () => {
    jest.mock('../../../../server/config', () => {
      return {
        port: 3004,
        env: 'production'
      }
    })

    createServer = require('../../../../server')
    server = createServer()

    expect(server).toBeDefined()
  })

  test('createServer returns server in development', () => {
    jest.mock('../../../../server/config', () => {
      return {
        port: 3004,
        isDev: true
      }
    })

    createServer = require('../../../../server')
    server = createServer()

    expect(server).toBeDefined()
  })
})
