export const updateBranchPath = {
  patch: {
    tags: ['Branches'],
    summary: 'API para atualizar uma filial',
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
        description: 'ID of the branch to be updated',
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
