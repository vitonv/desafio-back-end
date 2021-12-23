import { CreateBranchService } from '../../../../app/services/branches/createBranch';
import { PgBranchesRepository } from '../../../../infra/database/repositories/branches';

export const makeCreateBranch = () => {
  const branchesRepository = new PgBranchesRepository();
  return new CreateBranchService(branchesRepository, branchesRepository);
};
