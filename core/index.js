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

const sum = (...values) => _.sum(toFlatArray(values));

const average = (...values) => {
	const arr = toFlatArray(values);

	return _.sum(arr) / arr.length;
};

const limit = (min, max) => value =>
	value > max ? max : value < min ? min : value;

const map = (...funcs) => (...args) => {
	const arrFunctions = toFlatArray(funcs);
	const arrArgs = toFlatArray(args);

	return arrFunctions.map((f, i) => evaluate(f, arrArgs[i]));
};

const reduce = (func, initial = 1) => (...args) =>
	toFlatArray(args).reduce(func, initial);

const filter = predicate => (...args) => toFlatArray(args).filter(predicate);

module.exports = {
	synthesizer,
	synthesize: synthesizer,
	synth: synthesizer,
	compose,
	log,
	split,
	scale,
	sum,
	average,
	limit,
	constrain: limit,
	map,
	mapEach: map,
	apply: map,
	reduce,
	filter
};
