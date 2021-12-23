export const listBranchPath = {
  get: {
    tags: ['Branches'],
    summary: 'API para listar as filiais',
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
