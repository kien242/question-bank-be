const ENV = process.env.NODE_ENV;

const colorize = (...args) => ({
	black: `\x1b[30m${args.join(" ")}`,
	red: `\x1b[31m${args.join(" ")}`,
	green: `\x1b[32m${args.join(" ")}`,
	yellow: `\x1b[33m${args.join(" ")}`,
	blue: `\x1b[34m${args.join(" ")}`,
	magenta: `\x1b[35m${args.join(" ")}`,
	cyan: `\x1b[36m${args.join(" ")}`,
	white: `\x1b[37m${args.join(" ")}`,
	reset: `\x1b[0m${args.join(" ")}`,
	bright: `\x1b[1m${args.join(" ")}`,
	dim: `\x1b[2m${args.join(" ")}`,
	underscore: `\x1b[4m${args.join(" ")}`,
	blink: `\x1b[5m${args.join(" ")}`,
	reverse: `\x1b[7m${args.join(" ")}`,
	hidden: `\x1b[8m${args.join(" ")}`,
	bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
	bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
	bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
	bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
	bgBlue: `\x1b[44m${args.join(" ")}\x1b[0m`,
	bgMagenta: `\x1b[45m${args.join(" ")}\x1b[0m`,
	bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
	bgWhite: `\x1b[47m${args.join(" ")}\x1b[0m`,
	error: `\x1b[31m${args.join(" ")}`,
	success: `\x1b[32m${args.join(" ")}`,
	warn: `\x1b[34m${args.join(" ")}`,
});

const logError = (text) => {
	if (ENV == "dev") {
		console.log(colorize(text).error);
	} else {
	}
};

const logWarn = (text) => {
	if (ENV == "dev") {
		console.log(colorize(text).warn);
	} else {
	}
};

const logSuccess = (text) => {
	if (ENV == "dev") {
		console.log(colorize(text).success);
	} else {
	}
};

const logInfo = (text) => {
	if (ENV == "dev") {
		console.log(colorize(text).magenta);
	} else {
	}
};

module.exports = { colorize, logError, logSuccess, logWarn, logInfo };
