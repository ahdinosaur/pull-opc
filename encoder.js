const pullMap = require('pull-stream/throughs/map')
const { encodePixelsMessage } = require('opc/codec')

module.exports = function OpcPixelsEncoder (channel) {
  return pullMap(buffer => {
    return encodePixelsMessage(channel, buffer)
  })
}
