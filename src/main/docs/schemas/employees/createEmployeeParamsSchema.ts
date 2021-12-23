export const createEmployeeParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    branch_name: {
      type: 'string',
    },
  },
  required: ['name', 'branch_id'],
};
