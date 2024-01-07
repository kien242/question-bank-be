const { HEADER } = require('../../../src/config/header.js');

const securitySchemes = {
  access_token: {
    type: 'http',
    scheme: 'bearer',
    name: HEADER.JWT_TOKEN,
    in: 'header',
  },
  refresh_token: {
    type: 'http',
    scheme: 'bearer',
    name: HEADER.JWT_TOKEN,
    in: 'header',
  },
};

module.exports = { securitySchemes };
