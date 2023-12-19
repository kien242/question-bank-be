const signUpRes200 = {
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
            example: 'Create a new user successfully',
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
              authToken: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1N5cCI6Ikp9.VySWQiOiI2NTYzMzg0YmM5NTA1NjJlNWE5Y2YyOGQiLCJlbWFpbCI6IjA3QGdtYWlsLmNvbSIsImlhdCI6MTcwMTAwMTI5MSwiZXhwIjoxNzAxMDAzMDkxfQ.p-Yl8ACZw0uDNMlvO5dtMKZNxZPR4hZkoI5swUEM',
                  },
                  refreshToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1cCI6IkpJ9.2VySWQiOiI2NTYzMzg0YmM5NTA1NjJlNWE5Y2YyOGQiLCJlbWFpbCI6IjA3QGdtYWlsLmNvbSIsCI6MTcwMTAwMTI5MSwiZXhwIjoxNzAxNjA2MDkxfQ.W9-lR1h3n6-7ddaLo-oRhWAhADB8u6qkZRHEd8A',
                  },
                },
              },
              activeLink: {
                type: 'string',
                example:
                  'http://localhost:8000/api/v1/access/active?i=6578b360f40a8e170c66ef83&t=ef5a6ff7236489379c54392b07ea46aef5d767e8713b2d3af4fc0a6c8f7f1acc',
              },
            },
          },
        },
      },
    },
  },
};
const signUpRes400 = {
  description: 'Response with status code 400',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error',
          },
          code: {
            type: 'number',
            example: '400',
          },
          message: {
            type: 'string',
            example: 'User John Snow already exists',
          },
        },
      },
    },
  },
};

const loginRes200 = {
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
            example: 'Create a new user successfully',
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
              authToken: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1N5cCI6Ikp9.VySWQiOiI2NTYzMzg0YmM5NTA1NjJlNWE5Y2YyOGQiLCJlbWFpbCI6IjA3QGdtYWlsLmNvbSIsImlhdCI6MTcwMTAwMTI5MSwiZXhwIjoxNzAxMDAzMDkxfQ.p-Yl8ACZw0uDNMlvO5dtMKZNxZPR4hZkoI5swUEM',
                  },
                  refreshToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1cCI6IkpJ9.2VySWQiOiI2NTYzMzg0YmM5NTA1NjJlNWE5Y2YyOGQiLCJlbWFpbCI6IjA3QGdtYWlsLmNvbSIsCI6MTcwMTAwMTI5MSwiZXhwIjoxNzAxNjA2MDkxfQ.W9-lR1h3n6-7ddaLo-oRhWAhADB8u6qkZRHEd8A',
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
const loginRes400 = {
  description: 'Response with status code 400',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error',
          },
          code: {
            type: 'number',
            example: '400',
          },
          message: {
            type: 'string',
            example: 'User is not registered',
          },
        },
      },
    },
  },
};

const logoutRes200 = {
  description: 'Response with status code 200',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'error',
          },
          code: {
            type: 'number',
            example: '400',
          },
          message: {
            type: 'string',
            example: 'User is not registered',
          },
        },
      },
    },
  },
};

const handleRefreshToken200 = {
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
            example: 'Get token successfully',
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
              authToken: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1N5cCI6Ikp9.VySWQiOiI2NTYzMzg0YmM5NTA1NjJlNWE5Y2YyOGQiLCJlbWFpbCI6IjA3QGdtYWlsLmNvbSIsImlhdCI6MTcwMTAwMTI5MSwiZXhwIjoxNzAxMDAzMDkxfQ.p-Yl8ACZw0uDNMlvO5dtMKZNxZPR4hZkoI5swUEM',
                  },
                  refreshToken: {
                    type: 'string',
                    example:
                      'eyJhbGciOiJIUzI1cCI6IkpJ9.2VySWQiOiI2NTYzMzg0YmM5NTA1NjJlNWE5Y2YyOGQiLCJlbWFpbCI6IjA3QGdtYWlsLmNvbSIsCI6MTcwMTAwMTI5MSwiZXhwIjoxNzAxNjA2MDkxfQ.W9-lR1h3n6-7ddaLo-oRhWAhADB8u6qkZRHEd8A',
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

export {
  signUpRes200,
  signUpRes400,
  loginRes200,
  loginRes400,
  logoutRes200,
  handleRefreshToken200,
};
