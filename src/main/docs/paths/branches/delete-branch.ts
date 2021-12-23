export const deleteBranchPath = {
  delete: {
    tags: ['Branches'],
    summary: 'API para excluir uma filial',
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

    responses: {
      204: {
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
