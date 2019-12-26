const _ = require("lodash");

const lowPass = _.memoize((key, samplingRate = 44100) => {
	//-- https://www.musicdsp.org/en/latest/Filters/38-lp-and-hp-filter.html
	let in1 = 0;
	let in2 = 0;

	let out1 = 0;
	let out2 = 0;

	return (cutOff = 200, resonance = 0.7) => {
		const c = 1.0 / Math.tan((Math.PI * cutOff) / samplingRate);

		const a1 = 1.0 / (1.0 + resonance * c + c * c);
		const a2 = 2 * a1;
		const a3 = a1;
		const b1 = 2.0 * (1.0 - c * c) * a1;
		const b2 = (1.0 - resonance * c + c * c) * a1;

		return input => {
			const output =
				a1 * input + a2 * in1 + a3 * in2 - b1 * out1 - b2 * out2;

			in2 = in1;
			in1 = input;

			out2 = out1;
			out1 = output;

			return output;
		};
	};
});

const highPass = _.memoize((key, samplingRate = 44100) => {
	//-- https://www.musicdsp.org/en/latest/Filters/38-lp-and-hp-filter.html
	let in1 = 0;
	let in2 = 0;

	let out1 = 0;
	let out2 = 0;

	return (cutOff = 400, resonance = 0.7) => {
		const c = Math.tan((Math.PI * cutOff) / samplingRate);

		const a1 = 1.0 / (1.0 + resonance * c + c * c);
		const a2 = -2 * a1;
		const a3 = a1;
		const b1 = 2.0 * (c * c - 1.0) * a1;
		const b2 = (1.0 - resonance * c + c * c) * a1;

		return input => {
			const output =
				a1 * input + a2 * in1 + a3 * in2 - b1 * out1 - b2 * out2;

			in2 = in1;
			in1 = input;

			out2 = out1;
			out1 = output;

			return output;
		};
	};
});

const envelope = _.memoize((key, samplingRate = 44100) => {
	//-- https://www.musicdsp.org/en/latest/Analysis/136-envelope-follower-with-different-attack-and-release.html
	let env = 0;

	return (attackInMs, releaseInMs) => {
		const attackCoef = Math.pow(
			0.01,
			1.0 / (attackInMs * samplingRate * 0.001)
		);
		const releaseCoef = Math.pow(
			0.01,
			1.0 / (releaseInMs * samplingRate * 0.001)
		);

		return input => {
			let tmp = Math.abs(input);

			if (tmp > env) env = attackCoef * (env - tmp) + tmp;
			else env = releaseCoef * (env - tmp) + tmp;

			return env;
		};
	};
});

const movingAverage = _.memoize((key, numSamples = 1024) => {
	let samples = [];
	let index = 0;

	return input => {
		if (index === numSamples) index = 0;

		samples[index++] = input;

		return _.sum(samples) / samples.length;
	};
});

module.exports = {
	lowPass,
	highPass,
	envelope,
	adsr: envelope,
	movingAverage,
	movingAvg: movingAverage
};
