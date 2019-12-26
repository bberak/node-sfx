const { synthesizer, loop, compose, map, passThrough, sum } = require("../core");
const { a, b, c, d, e, f, g, triangle, } = require("../waves");
const { lowPass, envelope } = require("../filters");
const { listenForExit } = require("../utils");

synthesizer(
	loop(
		[c(3), e(3), g(3), b(3), c(4), b(3), g(3), e(3)],
		275,
		compose(
			map(
				compose(triangle(4), lowPass("lp")(120)),
				passThrough
			),
			sum,
			envelope("e")(10, 2)
		)
	)
).play();

listenForExit();
