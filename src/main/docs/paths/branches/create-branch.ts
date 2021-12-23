export const createBranchPath = {
  post: {
    tags: ['Branches'],
    summary: 'API para cadastrar uma nova filial',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createBranchParams',
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
