export const updateEmployeePath = {
  patch: {
    tags: ['Employees'],
    summary: 'API para cadastrar um(a) funcionário(a)',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID of the employee to be updated',
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
      204: {
        $ref: '#/components/noContent',
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
