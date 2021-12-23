import { UpdateBranchService } from '../../../../app/services/branches/update';
import { PgBranchesRepository } from '../../../../infra/database/repositories/branches';

export const makeUpdateBranch = () => {
  const updateBranchRepository = new PgBranchesRepository();
  return new UpdateBranchService(updateBranchRepository);
};
