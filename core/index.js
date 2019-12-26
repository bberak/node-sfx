const generator = require("audio-generator/stream");
const speaker = require("audio-speaker/stream");
const _ = require("lodash");
const { toFunction, toFlatArray, evaluate, log } = require("../utils");

const synthesizer = graph => {
	const synth = generator(graph);

	return {
		play: speakerConfig => synth.pipe(new speaker(speakerConfig))
	};
};

const compose = (...funcs) => _.flow(toFlatArray(funcs).map(toFunction));

const split = n => value => _.range(0, n).map(() => value);

const scale = n => value => n * value;

const limit = (min, max) => value =>
	value > max ? max : value < min ? min : value;

const map = (...funcs) => (...args) => {
	const arrFunctions = toFlatArray(funcs);
	const arrArgs = toFlatArray(args);

	return arrFunctions.map((f, i) => evaluate(f, arrArgs[i]));
};

const reduce = (func, initial = 0) => (...args) =>
	toFlatArray(args).reduce(func, initial);

const sum = reduce((x, y) => x + y);

const multiply = reduce((x, y) => x * y);

const average = (...values) => {
	const arr = toFlatArray(values);

	return _.sum(arr) / arr.length;
};

const filter = predicate => (...args) => toFlatArray(args).filter(predicate);

const loop = (sheet, bpm = 192) => {
	const multiTrack = _.isArray(sheet[0]);
	const length = multiTrack ? _.maxBy(sheet, s => s.length).length : sheet.length;
	const beat = 60 / bpm;

	return time => {
		const index = Math.trunc(time / beat) % length;

		return multiTrack
			? sheet.map(s => s[index] || echo(0)).map(x => x(time))
			: sheet[index](time);
	};
};

const passThrough = x => x;

const echo = val => () => val;

module.exports = {
	synthesizer,
	synthesize: synthesizer,
	synth: synthesizer,
	compose,
	log,
	split,
	scale,
	limit,
	constrain: limit,
	map,
	mapEach: map,
	apply: map,
	reduce,
	sum,
	multiply,
	cross: multiply,
	dot: multiply,
	average,
	avg: average,
	filter,
	loop,
	repeat: loop,
	passThrough,
	pass: passThrough,
	echo,
	noop: _.noop,
	noOp: _.noop,
	nop: _.noop
};
