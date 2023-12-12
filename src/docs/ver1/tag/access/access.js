const {
  signUpRes200,
  signUpRes400,
} = require("#docs/ver1/res/access/index.js");
const { createUserBody } = require("#docs/ver1/schema/user.js");

const signUp = {
  tags: ["Access"],
  summary: "Creates list of users with given input object",
  description: "Creates list of users with given input object",
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

module.exports = {
  signUp,
};
