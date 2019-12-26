const { synthesizer, compose, split, map, limit, reduce, scale } = require("../core");
const { sine, triangle, saw, square, pulse, clausen, noise, perlin, a, b, c, d, e, f, g } = require("../waves");
const { lowPass, highPass, envelope } = require("../filters");
const { listenForExit, keypress, log } = require("../utils");

const notes = {
	"z": a(2),
	"x": b(2),
	"c": c(2),
	"v": d(2),
	"b": e(2),
	"n": f(2),
	"m": g(2),

	"a": a(3),
	"s": b(3),
	"d": c(3),
	"f": d(3),
	"g": e(3),
	"h": f(3),
	"j": g(3),
	"k": a(4),
	"l": b(4),

	"q": c(4),
	"w": d(4),
	"e": e(4),
	"r": f(4),
	"t": g(4),
	"y": a(5),
	"u": b(5),
	"i": c(5),
	"o": d(5),
	"p": e(5)
};

let effects = [
	(base, time, mix) => base + (saw(2)(time) + pulse(0.1)(time)) * mix,
	(base, time, mix) => base + (saw(2)(time) + pulse(0.2)(time) + square(1)(time)) * mix,
	(base, time, mix) => base + (saw(2)(time) + pulse(0.2)(time) + square(5)(time)) * mix,
	(base, time, mix) => base + compose(triangle(4), lowPass("lp1")(220))(time) * mix,
	(base, time, mix) => base * sine(2)(time) * 4 * mix,
	(base, time, mix) => base + compose(sine(8), lowPass("lp2")(120))(time) * mix,
	(base, time, mix) => base + compose(sine(2), lowPass("lp2")(120))(time) * mix,
	(base, time, mix) => base + perlin(1)(time) * mix,
	(base, time, mix) => base * mix
];

let note = notes["z"];
let effect = effects[0];
let mix = 0.5;

keypress(key => {
	if (notes[key.name])
		note = notes[key.name]

	switch (key.name) {
		case "left": effect = effects[effects.indexOf(effect) - 1] || effects[effects.length - 1]; break;
		case "right": effect = effects[effects.indexOf(effect) + 1] || effects[0]; break;
		case "up": mix = limit(-0.5, 1.5)(mix + 0.05); break;
		case "down": mix = limit(-0.5, 1.5)(mix - 0.05); break;
	}
});

synthesizer(time =>
	compose(
		note,
		base => effect(base, time, mix),
		envelope("e")(10, 2)
	)(time)
).play();

listenForExit();
