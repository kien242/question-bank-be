const { HEADER } = require("#config/header.js");

const securitySchemes = {
  access_token: {
    type: "apiKey",
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
