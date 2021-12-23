import { CreateBranchController } from '../../../../../presentation/controllers/branches/create';
import { makeCreateBranch } from '../../../services/branches/CreateBranch';

export const makeCreateBranchController = () => {
  return new CreateBranchController(makeCreateBranch());
};
