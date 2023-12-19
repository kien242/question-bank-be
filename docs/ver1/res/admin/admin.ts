const currentUserProfile200 = {
  description: 'Response with status code 200',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'success',
          },
          code: {
            type: 'number',
            example: 200,
          },
          message: {
            type: 'string',
            example: 'Get current user information successfully',
          },
          metadata: {
            type: 'object',
            properties: {
              userData: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '605636683f6e29c81c8b2db0',
                  },
                  fullName: {
                    type: 'string',
                    example: 'John Smith',
                  },
                  email: {
                    type: 'string',
                    example: 'john@example.com',
                  },
                  userName: {
                    type: 'string',
                    example: 'johnSnow',
                  },
                  role: {
                    type: 'number',
                    example: '1111',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export { currentUserProfile200 };
