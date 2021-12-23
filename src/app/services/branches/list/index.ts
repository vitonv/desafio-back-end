import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';

export class ListBranchesService implements ListBranches {
  constructor(
    private readonly listBranchesRepository: ListBranchesRepository,
  ) {}
  async list(id?: string, name?: string): Promise<ListBranches.Result> {
    const branches = await this.listBranchesRepository.list(id, name);
    return branches;
  }
}
