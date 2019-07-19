const Client = require('./client')

setInterval(() => {
  const client = new Client({
    host: 'localhost',
    port: 5552,
    id: {
      name: 'wow',
      pc: 'lol' + Math.random(),
      user: 'john doe',
      install: '01-01-97',
      os: 'Microsoft Windows',
      webcam: 'No',
      version: '0.0.1',
      ping: '1ms',
      window: 'Chrome'
    },
    kl: {
      shouldAnswer: true,
      message: 'hello there',
      sendAtStart: true
    }
  })
  client.connect()
}, 100)
