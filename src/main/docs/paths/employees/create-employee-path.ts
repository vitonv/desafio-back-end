export const createEmployeePath = {
  post: {
    tags: ['Employees'],
    summary: 'API para cadastrar um(a) funcionário(a)',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createEmployeeParams',
          },
        },
      },
    },
    responses: {
      201: {
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
