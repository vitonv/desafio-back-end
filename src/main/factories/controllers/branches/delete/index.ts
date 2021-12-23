import { DeleteBranchController } from '../../../../../presentation/controllers/branches/delete';
import { makeDeleteBranch } from '../../../services/branches/DeleteBranch';

export const makeDeleteBranchController = () => {
  return new DeleteBranchController(makeDeleteBranch());
};
