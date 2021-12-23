export const deleteEmployeePath = {
  delete: {
    tags: ['Employees'],
    summary: 'API para excluir um(a) funcionário(a)',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
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
