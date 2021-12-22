export interface CreateBranchRepository {
  create(name: string): Promise<void>;
}
