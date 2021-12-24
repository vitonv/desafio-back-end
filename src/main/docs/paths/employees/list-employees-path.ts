export const listEmployeePath = {
  get: {
    tags: ['Employees'],
    summary: 'API para listar os funcionários',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: false,
        description: 'Filter to find employee by ID',
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
