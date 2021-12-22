export const signInPath = {
  post: {
    tags: ['Users'],
    summary: 'API para autenticar um usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signInParams',
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
