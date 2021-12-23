export interface UpdateBranch {
  update(id: string, name: string): Promise<boolean>;
}
