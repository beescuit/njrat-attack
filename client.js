const net = require('net')
const { formatCMD, btoa } = require('./utils')

class Client {
  constructor (options) {
    this.options = options
  }

  connect (callback) {
    this.client = new net.Socket()
    this.client.connect(this.options.port, this.options.host, () => {
      if (callback) callback()
      this.indentify()
    })

    this.client.on('data', this.handlePackets.bind(this))
  }

  handlePackets (data) {
    // this function handles received packets
    const dataString = data.toString()

    // keep alive
    if (dataString === '0') {
      this.client.write(Buffer.from('3000', 'hex'))
    }

    const msg = dataString.split('\x00')[1].split("|'|'|")
    const command = msg[0]
    msg.shift()

    // Keylogger
    if (this.options.kl && this.options.kl.shouldAnswer && command === 'kl') {
      this.client.write(formatCMD({
        name: 'kl',
        params: [
          btoa(this.options.kl.message)
        ]
      }))
    }

    // Screen Cap (in table)
    if (this.options.cap && this.options.cap.shouldAnswer && command === 'CAP') {
      this.client.write(formatCMD({
        name: 'CAP',
        file: this.options.cap.file
      }))
    }
  }

  indentify () {
    // this is the info packet (things that will appear in the main table)
    const id = this.options.id || {
      name: 'wow',
      pc: 'lol' + Math.random(),
      user: 'john doe',
      install: '01-01-97',
      os: 'Microsoft Windows',
      webcam: 'No',
      version: '0.0.1',
      ping: '1ms',
      window: 'Chrome'
    }
    this.client.write(formatCMD({
      name: 'll',
      params: [
        btoa(id.name),
        id.pc,
        id.user,
        id.install,
        '',
        id.os,
        id.webcam,
        id.version,
        id.ping,
        btoa(id.window),
        ''
      ]
    }))

    // initial keylogger command (for a pop-up)
    if (this.options.kl && this.options.kl.sendAtStart) {
      this.client.write(formatCMD({
        name: 'kl',
        params: [
          btoa(this.options.kl.message)
        ]
      }))
    }
  }
}

module.exports = Client
