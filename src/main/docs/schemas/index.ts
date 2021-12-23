import branchSchemas from './branches';
import employeeSchemas from './employees';
import usersSchemas from './users';

export default {
  ...usersSchemas,
  ...branchSchemas,
  ...employeeSchemas,
};
