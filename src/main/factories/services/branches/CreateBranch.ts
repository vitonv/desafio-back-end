import { CreateBranchService } from '../../../../app/services/branches/createBranch';
import { PgBranchesRepository } from '../../../../infra/database/repositories/branches';

export const makeCreateBranch = () => {
  const createBranchRepository = new PgBranchesRepository();
  return new CreateBranchService(createBranchRepository);
};
