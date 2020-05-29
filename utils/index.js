const _ = require("lodash");
const readline = require("readline");
const two_pi = Math.PI * 2;

const remap = (n, start1, stop1, start2, stop2) => {
	return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

const toFunction = x => (_.isFunction(x) ? x : () => x);

const toFlatArray = (...values) => _.flattenDeep(values || []);

const evaluate = (input, args) => (_.isFunction(input) ? input(args) : input);

const log = label => value => {
	if (label) console.log(label, value);
	else console.log(value);

	return value;
};

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const keypress = cb => {
	process.stdin.on("keypress", (str, key) => cb(key, str));
};

const exit = () => {
	keypress(key => {
		if (key.ctrl && key.name === "c") process.exit();
	});

	console.log("Press control + c to exit");
};

exit();

module.exports = {
	two_pi,
	remap,
	toFunction,
	toFlatArray,
	evaluate,
	log,
	keypress,
	exit,
	listenForExit: exit
};
