import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';

export interface ListBranchesRepository {
  list(id?: string, name?: string): Promise<ListBranchesRepository.Result>;
}
export namespace ListBranchesRepository {
  export type Result = ListBranches.Result;
}
