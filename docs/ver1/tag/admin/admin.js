const { QUERY } = require('../../../../src/config/customQuery.js');
const { currentUserProfile200 } = require('../../res/user/index.js');
const { updateUserBodyAdmin } = require('../../schema/admin.user.js');

const getUserInfo = {
  tags: ['Admin'],
  summary: 'Get user profile',
  description: 'Get user profile',
  operationId: 'getListUserProfile',
  parameters: [
    {
      name: QUERY.TYPE_USER,
      in: 'query',
      description: 'Get user profile of Teacher or student',
      required: false,
      explode: true,
      schema: {
        type: 'string',
        default: 'teacher',
        enum: ['teacher', 'student'],
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
const updateUserInfo = {
  tags: ['Admin'],
  summary: 'Update user profile',
  description: 'Update user profile',
  operationId: 'UpdateUserProfile',
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
      'application/json': {
        schema: updateUserBodyAdmin,
      },
    },
  },
  responses: {
    200: currentUserProfile200,
  },
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
