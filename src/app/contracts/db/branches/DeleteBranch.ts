export interface DeleteBranchRepository {
  delete(id: string): Promise<void>;
}
