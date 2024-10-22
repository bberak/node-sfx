<p align="center">
  <img src="https://raw.githubusercontent.com/bberak/node-sfx/master/assets/logo.png" alt="Node SFX" height="120" />
</p>

# Node SFX &middot; [![npm version](https://badge.fury.io/js/node-sfx.svg)](https://badge.fury.io/js/node-sfx) [![mit license](https://img.shields.io/badge/license-MIT-50CB22.svg)](https://opensource.org/licenses/MIT)

A library for composing and synthesizing sound for **NodeJS** programs using a variety of waves (oscillators), filters and other higher order functions.

## Requirements

- NodeJS `v8.9.4`
- NPM `v6.9.0`
- Linux users must install [ALSA](https://alsa-project.org/wiki/Main_Page) header files: `sudo apt-get install libasound2-dev`

## Getting Started

Install the pacakge:

```
npm install --save node-sfx
```

Import the package and create a synthesis graph:

```javascript
const { synthesizer, loop, compose, map, scale } = require("node-sfx/core");
const { a, b, c, d, e, f, g } = require("node-sfx/waves");
const { lowPass } = require("node-sfx/filters");

synthesizer(
	compose(
		loop(
			[
				[c(4), e(4), g(4), b(4), c(5), b(4), g(4), e(4)],
				[c(2), e(2), g(2), b(2), c(3), b(2), g(2), e(2)]
			],
			275 // beats per minute
		),
		map(scale(0.5), scale(1)),
		map(lowPass("l")(440), lowPass("r")(440))
	)
).play();
```

## Roadmap

- Adding the ability to record and save a tune to a `.wav` file
- Adding the ability to playback a recorded tune - either from a `.wav` file or another format

## Built with amazing tools 💕

- [audio-generator](https://github.com/audiojs/audio-generator)
- [audio-speaker](https://github.com/audiojs/audio-speaker)
- [periodic-function](https://github.com/scijs/periodic-function)

## License

MIT License

Copyright (c) 2019 Boris Berak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.