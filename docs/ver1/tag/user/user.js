const { currentUserProfile200 } = require('../../res/user/index.js');
const { updateUserBody } = require('../../schema/user.js');

const getCurrentUserInfo = {
  tags: ['Profile'],
  summary: 'Get current user profile',
  description: 'Get current user profile',
  operationId: 'GetCurrentUserProfile',
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
const updateCurrentUserInfo = {
  tags: ['Profile'],
  summary: 'Update current user profile',
  description: 'Update current user profile',
  operationId: 'UpdateCurrentUserProfile',
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
        schema: updateUserBody,
      },
    },
  },
  responses: {
    200: currentUserProfile200,
  },
};

module.exports = {
  getCurrentUserInfo,
  updateCurrentUserInfo,
};
