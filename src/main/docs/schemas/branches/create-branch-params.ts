export const createBranchParamsSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  example: {
    name: 'Branch no II',
  },
  required: ['name'],
};
