# pull-opc

[pull streams](https://pull-stream.github.io) for [Open Pixel Control](http://openpixelcontrol.org/)

```shell
npm install --save pull-opc
```

## usage

### `createStream = require('pull-opc')`

creates a stream that emits Open Pixel Control protocol messages.

### `stream = createStream()`

this module is not effective for real-time pixels, since it buffers each message.

however it can be useful as a way to send special OPC messages before a stream of encoded pixels (hint: [`pull-cat`](https://github.com/pull-stream/pull-cat))

### `stream.pushPixels(channel, pixels)`

emits a *[set pixel colors][opc set]* command message with the color data in the *pixels* buffer.

[opc set]: https://github.com/scanlime/fadecandy/blob/master/doc/fc_protocol_opc.md#set-pixel-colors

### `stream.pushColorCorrection(config)`

emits a [Fadecandy *set global color correction*][fc color] command message with the given *config* object.

[fc color]: https://github.com/scanlime/fadecandy/blob/master/doc/fc_protocol_opc.md#set-global-color-correction

### `stream.pushMessage(channel, command, data)`

emits a generic [Open Pixel Control message][opc message]. *Data* should be a buffer.

[opc message]: https://github.com/scanlime/fadecandy/blob/master/doc/fc_protocol_opc.md#command-format

### `createPixelsEncoder = require('pull-opc/encoder')`

### `pixelsEncoder = createPixelsEncoder(channel)`

`pixelsEncoder` is a through stream that receives `opc/strand` buffers and encodes them to Open Pixel Control messages.

### `createDecoder = require('pull-opc/decoder')`

### `decoder = createDecoder()`

create a through stream that parses binary data written to it an emits Open Pixel Control messages. message objects have the following properties:

 * `channel`: The channel id
 * `command`: The command id
 * `data`: A buffer containing the message data

## see also

- [`parshap/js-opc`](https://github.com/parshap/js-opc)
- [`livejs/pixels-opc`](https://github.com/livejs/pixels-opc)

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
