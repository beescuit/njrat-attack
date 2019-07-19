const net = require('net')
const gifFrames = require('gif-frames')
const { formatCMD, btoa } = require('./utils')

class Client {
  constructor (options) {
    this.options = options
  }

  connect (callback) {
    this.client = new net.Socket()
    this.client.connect(this.options.port, this.options.host, () => {
      // send identification packet
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
      this.indentify(id)
      // initial keylogger command (for a pop-up)
      if (this.options.kl && this.options.kl.sendAtStart) this.sendKeyLog(this.options.kl.message)
      // Animated screen cap
      if (this.options.cap && this.options.cap.gif) this.startAnimation()
      if (callback) callback()
    })

    this.client.on('data', this.handlePackets.bind(this))
  }

  async startAnimation () {
    const framedata = await gifFrames({ url: this.options.cap.gif, frames: 'all' })
    const frames = await Promise.all(framedata.map(async frame => {
      const stream = frame.getImage()
      const wait = new Promise((resolve, reject) => {
        const bufs = []
        stream.on('data', d => bufs.push(d))
        stream.on('end', () => {
          resolve(Buffer.concat(bufs))
        })
      })
      const result = await wait
      return result
    }))
    let currentFrame = 0
    setInterval(() => {
      this.sendCap(frames[currentFrame])
      if (frames.length - 1 === currentFrame) {
        currentFrame = 0
      } else {
        currentFrame += 1
      }
    }, framedata[0].frameInfo.delay * 10)
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
    if (this.options.kl && this.options.kl.shouldAnswer && command === 'kl') this.sendKeyLog(this.options.kl.message)

    // Screen Cap (in table)
    if (this.options.cap && this.options.cap.shouldAnswer && command === 'CAP') this.sendCap(this.options.cap.file)
  }

  sendCap (file) {
    this.client.write(formatCMD({
      name: 'CAP',
      file
    }))
  }

  sendKeyLog (message) {
    this.client.write(formatCMD({
      name: 'kl',
      params: [
        btoa(message)
      ]
    }))
  }

  indentify (id) {
    // this is the info packet (things that will appear in the main table)
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
  }
}

module.exports = Client
