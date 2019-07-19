function formatCMD (cmd) {
  if (cmd.file) {
    const commandBuffer = Buffer.concat([Buffer.from(`${cmd.name}|'|'|`, 'utf8'), cmd.file])
    const packetsize = commandBuffer.length
    return Buffer.concat([Buffer.from(`${packetsize}\x00`), commandBuffer])
  }
  const cmdstring = `${cmd.name}|'|'|${cmd.params.join("|'|'|")}`
  const packetsize = cmdstring.length
  return Buffer.from(`${packetsize}\x00${cmdstring}`, 'utf8')
}

function btoa (str) {
  return Buffer.from(str.toString(), 'binary').toString('base64')
}

module.exports = { formatCMD, btoa }
