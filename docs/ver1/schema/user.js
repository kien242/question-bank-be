const { REQ_CUSTOM_FILED } = require("#config/reqCustom.js");

const createUserBody = {
  type: "object",
  properties: {
    [REQ_CUSTOM_FILED.USER_DATA]: {
      type: "object",
      properties: {
        fullName: {
          type: "string",
          description: "The full name of the user",
          example: "John Snow",
        },
        email: {
          type: "string",
          description: "The email address of the user",
          example: "john.snow@email.com",
        },
        password: {
          type: "string",
          description: "Unencrypted user's password",
          example: "!1234aWe1Ro3$#",
        },
        role: {
          type: "number",
          description: "The role of the user",
          example: 1111,
        },
        userName: {
          type: "string",
          description: "The userName",
          example: "kien242",
        },
      },
    },
  },
};

const loginUserBody = {
  type: "object",
  properties: {
    [REQ_CUSTOM_FILED.USER_DATA]: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "john.snow@email.com",
        },
        password: {
          type: "string",
          example: "!1234aWe1Ro3$#",
        },
      },
    },
  },
};

module.exports = { createUserBody, loginUserBody };
