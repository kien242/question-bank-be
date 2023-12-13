const {
  signUpRes200,
  signUpRes400,
  loginRes200,
  loginRes400,
  logoutRes200,
  handleRefreshToken200,
} = require("#docs/ver1/res/access/index.js");
const { createUserBody, loginUserBody } = require("#docs/ver1/schema/user.js");

const signUp = {
  tags: ["Access"],
  summary: "Creates users with given input object",
  description: "Creates users with given input object",
  operationId: "createUsers",
  requestBody: {
    content: {
      "application/json": {
        schema: createUserBody,
      },
    },
    require: true,
  },
  responses: {
    200: signUpRes200,
    400: signUpRes400,
  },
};

const login = {
  tags: ["Access"],
  summary: "Login users with given input object",
  description: "Login users with given input object",
  operationId: "loginUsers",
  requestBody: {
    content: {
      "application/json": {
        schema: loginUserBody,
      },
    },
    require: true,
  },
  responses: {
    200: loginRes200,
    400: loginRes400,
  },
};

const logout = {
  tags: ["Access"],
  summary: "Log out users",
  description: "Logout user",
  operationId: "LogoutUser",
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
      "application/json": {},
    },
  },
  responses: {
    200: logoutRes200,
  },
};

const handleRefreshToken = {
  tags: ["Access"],
  summary: "Handle refresh token",
  description: "Handle refresh token",
  operationId: "HandleRefreshToken",
  security: [
    {
      userId: [],
    },
    {
      refresh_token: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {},
    },
  },
  responses: {
    200: handleRefreshToken200,
  },
};

module.exports = {
  signUp,
  login,
  logout,
  handleRefreshToken,
};
