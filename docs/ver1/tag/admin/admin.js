const { QUERY } = require("#config/customQuery.js");
const { currentUserProfile200 } = require("#docs/ver1/res/user/index.js");
const { updateUserBody } = require("#docs/ver1/schema/user.js");

const getUserInfo = {
	tags: ["Admin"],
	summary: "Get user profile",
	description: "Get user profile",
	operationId: "getListUserProfile",
	parameters: [
		{
			name: QUERY.TYPE_USER,
			in: "query",
			description: "Get user profile of Teacher or student",
			required: false,
			explode: true,
			schema: {
				type: "string",
				default: "teacher",
				enum: ["teacher", "student"],
			},
		},
	],
	security: [
		{
			userId: [],
		},
		{
			access_token: [],
		},
	],
	responses: {
		200: currentUserProfile200,
	},
};
const updateCurrentUserInfo = {
	tags: ["Admin"],
	summary: "Update current user profile",
	description: "Update current user profile",
	operationId: "UpdateCurrentUserProfile",
	security: [
		{
			userId: [],
		},
		{
			access_token: [],
		},
	],
	requestBody: {
		content: {
			"application/json": {
				schema: updateUserBody,
			},
		},
	},
	responses: {
		200: currentUserProfile200,
	},
};

module.exports = {
	getUserInfo,
	updateCurrentUserInfo,
};
