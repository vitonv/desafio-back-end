import { CreateBranch } from '../../../../domain/useCases/branches/CreateBranch';
import { CreateBranchRepository } from '../../../contracts/db/branches/CreateBranch';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';

export class CreateBranchService implements CreateBranch {
  constructor(
    private readonly listBranchesRepository: ListBranchesRepository,
    private readonly createBranchRepository: CreateBranchRepository,
  ) {}
  async create(name: string): Promise<boolean> {
    const nameAlreadyExists = await this.listBranchesRepository.list(
      null,
      name,
    );
    if (!nameAlreadyExists.length) {
      await this.createBranchRepository.create(name);
      return true;
    }

    return false;
  }
}
