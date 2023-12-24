const { REQ_CUSTOM_FILED } = require('../../../src/config/reqCustom.js');

const createUserBody = {
  type: 'object',
  properties: {
    [REQ_CUSTOM_FILED.USER_DATA]: {
      type: 'object',
      properties: {
        fullName: {
          type: 'string',
          description: 'The full name of the user',
          example: 'John Snow',
        },
        email: {
          type: 'string',
          description: 'The email address of the user',
          example: 'john.snow@email.com',
        },
        password: {
          type: 'string',
          description: 'Unencrypted user"s password',
          example: '!1234aWe1Ro3$#',
        },
        role: {
          type: 'number',
          description: 'The role of the user',
          example: 1111,
        },
        userName: {
          type: 'string',
          description: 'The userName',
          example: 'kien242',
        },
      },
    },
  },
};

const loginUserBody = {
  type: 'object',
  properties: {
    [REQ_CUSTOM_FILED.USER_DATA]: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'john.snow@email.com',
        },
        password: {
          type: 'string',
          example: '!1234aWe1Ro3$#',
        },
      },
    },
  },
};

const updateUserBody = {
  type: 'object',
  properties: {
    [REQ_CUSTOM_FILED.USER_DATA]: {
      type: 'object',
      properties: {
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
};
module.exports = { createUserBody, loginUserBody, updateUserBody };
