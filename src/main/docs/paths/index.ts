import branchPaths from './branches';
import employeePaths from './employees';
import userPaths from './users';

export default {
  ...userPaths,
  ...branchPaths,
  ...employeePaths,
};
