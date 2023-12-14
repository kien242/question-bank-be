const { currentUserProfile200 } = require("#docs/ver1/res/user/index.js");

const getCurrentUserInfo = {
	tags: ["User"],
	summary: "Get current user profile",
	description: "Get current user profile",
	operationId: "GetCurrentUserProfile",
	security: [
		{
			userId: [],
		},
		{
			access_token: [],
		},
	],
	// requestBody: {
	// 	content: {
	// 		"application/json": {},
	// 	},
	// },
	responses: {
		200: currentUserProfile200,
	},
};

module.exports = {
	getCurrentUserInfo,
};
