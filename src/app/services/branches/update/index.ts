import { UpdateBranch } from '../../../../domain/useCases/branches/UpdateBranch';
import { UpdateBranchRepository } from '../../../contracts/db/branches/UpdateBranch';

export class UpdateBranchService implements UpdateBranch {
  constructor(
    private readonly updateBranchRepository: UpdateBranchRepository,
  ) {}
  async update(id: string, name: string): Promise<boolean> {
    await this.updateBranchRepository.update(id, name);
    return true;
  }
}
