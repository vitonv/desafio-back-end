export const signUpParamsSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  example: {
    name: 'John Doe',
    email: 'johndoe@mail.com',
    password: 'any_password',
  },
  required: ['name', 'email', 'password'],
};
