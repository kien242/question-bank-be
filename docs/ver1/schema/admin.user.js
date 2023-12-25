const { REQ_CUSTOM_FILED } = require('../../../src/config/reqCustom.js');

const updateUserBodyAdmin = {
  type: 'object',
  properties: {
    [REQ_CUSTOM_FILED.USER_DATA]: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '605636683f6e29c81c8b2db0',
          },
          fullName: {
            type: 'string',
            example: 'John Snow',
          },
          avatarUrl: {
            type: 'string',
            example:
              'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
          },
          birthday: {
            type: 'date',
            example: '2023-12-14T04:56:12Z',
          },
          genderIdentity: {
            type: 'string',
            example: 'female',
          },
          organization: {
            type: 'string',
            example: 'Company name',
          },
          address: {
            type: 'string',
            example: 'new york',
          },
        },
      },
    },
  },
};

module.exports = { updateUserBodyAdmin };
