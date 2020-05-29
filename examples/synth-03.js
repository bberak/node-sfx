const { synthesizer, loop, compose, map, scale } = require("../core");
const { a, b, c, d, e, f, g } = require("../waves");
const { lowPass } = require("../filters");

synthesizer(
	compose(
		loop(
			[
				[g(2), c(5), e(5), d(3), b(5), a(6), b(4), f(2), e(5)],
				[g(2), c(5), e(5), d(3), b(5), a(6), b(4), f(2), e(5)],
			],
			875 // beats per minute
		),
		map(lowPass("l")(440), lowPass("r")(440))
	)
).play();
