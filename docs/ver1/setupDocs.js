const swaggerJsdoc = require("swagger-jsdoc");
const { securitySchemes } = require("#docs/ver1/schema/security.js");
const { getCurrentUserInfo, updateCurrentUserInfo } = require("#docs/ver1/tag/user/user.js");
const { createUserBody, loginUserBody, updateUserBody } = require("#docs/ver1/schema/user.js");
const { signUp, login, logout, handleRefreshToken } = require("#docs/ver1/tag/access/access.js");

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Question Bank ",
			version: "1.0.0",
			description:
				"This is a simple CRUD API application made with Express and documented with Swagger",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
		},
		servers: [
			{
				url: "http://localhost:8000/api/v1/",
				description: "Local Server version 1",
			},
		],
		tags: [
			{
				name: "Access",
				description: "API for accessing",
			},
			{
				name: "User",
				description: "API for user",
			},
		],
		paths: {
			"/access/signup": {
				post: signUp,
			},
			"/access/login": {
				post: login,
			},
			"/access/logout": {
				delete: logout,
			},
			"/access/handle-refresh-token": {
				get: handleRefreshToken,
			},
			"/user/get-current-user-info": {
				get: getCurrentUserInfo,
			},
			"/user/update-current-user-info": {
				put: updateCurrentUserInfo,
			},
		},
		components: {
			securitySchemes: securitySchemes,
			schemas: {
				createUserBody,
				loginUserBody,
				updateUserBody,
			},
		},
	},
	apis: ["#router/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
