export const listBranchPath = {
  get: {
    tags: ['Branches'],
    summary: 'API para listar as filiais',
    parameters: [
      {
        in: 'query',
        name: 'id',
        schema: {
          type: 'string',
        },
        description: 'Filter to search a branch by id',
      },
      {
        in: 'query',
        name: 'name',
        schema: {
          type: 'string',
        },
        description: 'Filter to search a branch by name',
      },
    ],
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    responses: {
      200: {
        description: 'Success',
      },
      400: {
        $ref: '#/components/badRequest',
      },
      404: {
        $ref: '#/components/notFound',
      },
    },
  },
};
