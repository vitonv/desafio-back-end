import { ListBranchesService } from '../../../../app/services/branches/list';
import { PgBranchesRepository } from '../../../../infra/database/repositories/branches';

export const makeListBranches = () => {
  const listBranchesRepository = new PgBranchesRepository();
  return new ListBranchesService(listBranchesRepository);
};
