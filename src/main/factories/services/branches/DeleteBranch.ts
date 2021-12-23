import { DeleteBranchService } from '../../../../app/services/branches/delete';
import { PgBranchesRepository } from '../../../../infra/database/repositories/branches';

export const makeDeleteBranch = () => {
  const deleteBranchRepository = new PgBranchesRepository();
  return new DeleteBranchService(deleteBranchRepository);
};
