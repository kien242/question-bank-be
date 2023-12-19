import swaggerJsdoc from 'swagger-jsdoc';
import { deleteUserInfo, getUserInfo, updateUserInfo } from '../ver1/tag/admin/admin';
// import { securitySchemes } from 'docs/ver1/schema/security';
import { securitySchemes } from './schema/security';
import { getCurrentUserInfo, updateCurrentUserInfo } from './tag/user/user';
import { createUserBody, loginUserBody, updateUserBody } from './schema/user';
import { signUp, login, logout, handleRefreshToken } from './tag/access/access';

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
        delete: deleteUserInfo,
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
  apis: ['../../../src/router/*.ts'],
};

const specs = swaggerJsdoc(options);

export { specs };
