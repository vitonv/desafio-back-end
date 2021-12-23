export const listEmployeePath = {
  get: {
    tags: ['Employees'],
    summary: 'API para listar os funcionários',
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
