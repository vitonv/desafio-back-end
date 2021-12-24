export const deleteEmployeePath = {
  delete: {
    tags: ['Employees'],
    summary: 'API para excluir um(a) funcionário(a)',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID of the employee to be removed',
      },
    ],
    security: [
      {
        apiKeyAuth: [],
      },
    ],
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
