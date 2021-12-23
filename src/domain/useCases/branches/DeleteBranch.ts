export interface DeleteBranch {
  delete(id: string): Promise<boolean>;
}
