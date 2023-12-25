const swaggerJsdoc = require('swagger-jsdoc');
// const { getUserInfo, updateUserInfo } = require('./tag/admin/admin.js');
const { securitySchemes } = require('./schema/security.js');
const { getCurrentUserInfo, updateCurrentUserInfo } = require('./tag/user/user.js');
const { createUserBody, loginUserBody, updateUserBody } = require('./schema/user.js');
const { signUp, login, logout, handleRefreshToken } = require('./tag/access/access.js');
const { getUserInfo, updateUserInfo } = require('./tag/admin/admin.js');

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Question Bank ',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1/',
        description: 'Local Server version 1',
      },
    ],
    tags: [
      {
        name: 'Access',
        description: 'API for accessing',
      },
      {
        name: 'Admin',
        description: 'API for administration',
      },
      {
        name: 'User',
        description: 'API for user (teacher and student)',
      },
      {
        name: 'Question',
        description: 'API for question',
      },
      {
        name: 'Test',
        description: 'API for test',
      },
    ],
    paths: {
      '/access/signup': {
        post: signUp,
      },
      '/access/login': {
        post: login,
      },
      '/access/logout': {
        delete: logout,
      },
      '/access/handle-refresh-token': {
        get: handleRefreshToken,
      },
      '/user': {
        get: getCurrentUserInfo,
        put: updateCurrentUserInfo,
      },
      '/admin/user': {
        get: getUserInfo,
        put: updateUserInfo,
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
  apis: ['#router/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
