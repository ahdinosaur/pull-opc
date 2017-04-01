'use strict'

var pull = require('pull-stream/pull')
var Reader = require('pull-reader')

var Codec = require('opc/codec')

module.exports = function OpcDecoder () {
  return function (source) {
    var reader = Reader()

    pull(source, reader)

    return (abort, cb) => {
      if (abort) return reader.abort(abort, cb)

      Codec.decodeMessage(read, (message) => {
        cb(null, message)
      })

      function read (length, next) {
        reader.read(length, (err, data) => {
          if (err) cb(err)
          else next(data)
        })
      }
    }
  }
}
