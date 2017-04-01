'use strict'

const test = require('tape')
const pull = require('pull-stream')
const bufferEqual = require('buffer-equal')
const createStrand = require('opc/strand')
const pullConcat = require('pull-concat/buffer')

const createStream = require('../')
const createParser = require('../decoder')

test('pull-opc', function (t) {
  t.ok(createStream, 'encoder module is require-able')
  t.ok(createParser, 'decoder module is require-able')

  // strand
  var strand = createStrand(10)
  strand.setPixel(0, 5, 10, 15)
  strand.slice(2, 6).setPixel(3, 1, 2, 3)

  // encoder
  var stream = createStream()
  stream.pushPixels(0, strand.buffer)
  stream.pushMessage(5, 10, Buffer.from([0x0, 0x1, 0x2]))
  stream.end()
  pull(stream, pullConcat((err, data) => {
    t.error(err)

    // .pushPixels(0, strand.buffer);
    t.equal(data.readUInt8(0), 0)
    t.equal(data.readUInt8(1), 0)
    t.equal(data.readUInt16BE(2), strand.buffer.length)
    t.ok(bufferEqual(data.slice(4, 4 + strand.buffer.length), strand.buffer))

    // .pushMessage(5, 10, Buffer.from([0x0, 0x1, 0x2]));
    var offset = strand.buffer.length + 4
    t.equal(data.readUInt8(offset + 0), 5)
    t.equal(data.readUInt8(offset + 1), 10)
    t.equal(data.readUInt16BE(offset + 2), 3)
    t.ok(bufferEqual(data.slice(offset + 4), Buffer.from([0x0, 0x1, 0x2])))
  }))

  // TODO test stream.pushColorCorrection

  // decoder
  var parserAsserters = [
    function (message) {
      t.equal(message.channel, 0)
      t.equal(message.command, 0)
      t.ok(bufferEqual(message.data, strand.buffer))
    },
    function (message) {
      t.equal(message.channel, 1)
      t.equal(message.command, 0)
      t.ok(bufferEqual(message.data, strand.buffer))
    }
  ]
  var parserIndex = 0
  var stream2 = createStream()
  pull(
    stream2,
    createParser(),
    pull.drain(message => {
      parserAsserters[parserIndex](message)
      parserIndex += 1
    }, (err) => {
      t.error(err)
      t.equal(parserIndex, 2)
      t.end()
    })
  )
  stream2.pushPixels(0, strand.buffer)
  stream2.pushPixels(1, strand.buffer)
  stream2.end()
})
