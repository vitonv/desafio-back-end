import { CreateBranch } from '../../../../domain/useCases/branches/CreateBranch';
import { CreateBranchRepository } from '../../../contracts/db/branches/CreateBranch';

export class CreateBranchService implements CreateBranch {
  constructor(
    private readonly createBranchRepository: CreateBranchRepository,
  ) {}
  async create(name: string): Promise<void> {
    await this.createBranchRepository.create(name);
  }
}
