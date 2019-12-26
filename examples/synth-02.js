const { synthesizer, loop, compose, map, scale } = require("../core");
const { a, b, c, d, e, f, g } = require("../waves");
const { lowPass } = require("../filters");
const { listenForExit } = require("../utils");

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

listenForExit();
