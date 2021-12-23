import { UpdateBranchController } from '../../../../../presentation/controllers/branches/update';
import { Controller } from '../../../../../presentation/protocols';
import { makeUpdateBranch } from '../../../services/branches/UpdateBranch';

export const makeUpdateBranchController = (): Controller => {
  return new UpdateBranchController(makeUpdateBranch());
};
