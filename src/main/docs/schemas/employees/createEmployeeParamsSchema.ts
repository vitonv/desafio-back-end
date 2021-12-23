export const createEmployeeParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
  required: ['name'],
};
