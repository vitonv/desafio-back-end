import { DeleteBranch } from '../../../../domain/useCases/branches/DeleteBranch';
import { DeleteBranchRepository } from '../../../contracts/db/branches/DeleteBranch';

export class DeleteBranchService implements DeleteBranch {
  constructor(
    private readonly deleteBranchRepository: DeleteBranchRepository,
  ) {}
  async delete(id: string): Promise<boolean> {
    await this.deleteBranchRepository.delete(id);
    return true;
  }
}
