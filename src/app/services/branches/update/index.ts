import { UpdateBranch } from '../../../../domain/useCases/branches/UpdateBranch';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';
import { UpdateBranchRepository } from '../../../contracts/db/branches/UpdateBranch';

export class UpdateBranchService implements UpdateBranch {
  constructor(
    private readonly findBranchByName: ListBranchesRepository,
    private readonly updateBranchRepository: UpdateBranchRepository,
  ) {}
  async update(id: string, name: string): Promise<boolean> {
    const nameAlreadyExists = await this.findBranchByName.list(null, name);
    if (!nameAlreadyExists.length) {
      await this.updateBranchRepository.update(id, name);
      return true;
    }
    return false;
  }
}
