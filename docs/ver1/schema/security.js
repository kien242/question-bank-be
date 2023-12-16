const { HEADER } = require("#config/header.js");

const securitySchemes = {
	userId: {
		type: "apiKey",
		name: HEADER.USER_ID,
		in: "header",
	},
	access_token: {
		type: "http",
		scheme: "bearer",
		name: HEADER.ACCESS_TOKEN,
		in: "header",
	},
	refresh_token: {
		type: "apiKey",
		name: HEADER.REFRESH_TOKEN,
		in: "header",
	},
};

module.exports = { securitySchemes };
