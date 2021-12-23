import { ListBranchesController } from '../../../../../presentation/controllers/branches/list';
import { makeListBranches } from '../../../services/branches/ListBranches';

export const makeListBranchesController = () => {
  return new ListBranchesController(makeListBranches());
};
