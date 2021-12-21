export const signUpPath = {
  post: {
    tags: ['Users'],
    summary: 'API para solicitação de cadastro de um usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signUpParams',
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
