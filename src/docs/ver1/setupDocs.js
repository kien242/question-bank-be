const swaggerJsdoc = require("swagger-jsdoc");
const { securitySchemes } = require("./schema/security.js");
const { createUserBody } = require("./schema/user.js");
const { signUp } = require("./tag/access/access.js");

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
        description: "Operations about accessing",
      },
      {
        name: "User",
        description: "Operations about user",
      },
    ],
    paths: {
      "/access/signup": {
        post: signUp,
      },
    },
    components: {
      securitySchemes: securitySchemes,
      schemas: {
        createUserBody,
      },
    },
  },
  apis: ["../src/router/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
