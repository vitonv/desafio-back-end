export interface UpdateBranchRepository {
  update(id: string, name: string): Promise<void>;
}
