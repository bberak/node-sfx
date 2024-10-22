const periodic = require("periodic-function");
const { noise: _perlin } = require("./perlin");

_perlin.seed(Math.random());

const sine = (frequency, phase) => time =>
	periodic.sine(time * frequency, phase);

const sawtooth = (frequency, inverse) => time =>
	periodic.sawtooth(time * frequency, inverse);

const pulse = (frequency, ratio) => time => periodic.square(time * frequency, ratio);

const square = (frequency) => time => periodic.square(time * frequency, 0.5);

const triangle = (frequency, ratio) => time =>
	periodic.triangle(time * frequency, ratio);

const clausen = (frequency, limit) => time =>
	periodic.clausen(time * frequency, limit);

const perlin = (scale = 1) => time => _perlin.perlin2(time * scale, 1);

const note = n => (octave = 4, wave = sine) => wave(27.5 * Math.pow(2, octave + n));

const a = note(0 / 12);

const b = note(2 / 12);

const c = note(3 / 12);

const d = note(5 / 12);

const e = note(7 / 12);

const f = note(8 / 12);

const g = note(10 / 12);

module.exports = {
	sine,
	sin: sine,
	sawtooth,
	saw: sawtooth,
	square,
	sqr: square,
	pulse,
	triangle,
	tri: triangle,
	clausen,
	noise: periodic.noise,
	static: periodic.noise,
	perlin,
	note,
	a,
	b,
	c,
	d,
	e,
	f,
	g
};
