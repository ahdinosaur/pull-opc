'use strict'

var Pushable = require('pull-pushable')

var {
  encodeMessage,
  encodePixelsMessage,
  encodeSetGlobalColorCorrectionMessage
} = require('opc/codec')

module.exports = function OpcEncoder () {
  var pushable = Pushable()

  pushable.pushMessage = function (channel, command, data) {
    return pushable.push(encodeMessage(channel, command, data))
  }

  pushable.pushPixels = function (channel, pixels) {
    return pushable.push(encodePixelsMessage(channel, pixels))
  }

  pushable.pushColorCorrection = function (config) {
    return pushable.push(encodeSetGlobalColorCorrectionMessage(config))
  }

  return pushable
}
