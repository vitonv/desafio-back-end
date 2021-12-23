import { Branch } from '../../entities/Branch';

export interface ListBranches {
  list(id?: string, name?: string): Promise<ListBranches.Result>;
}

export namespace ListBranches {
  export type Result = Branch[];
}
