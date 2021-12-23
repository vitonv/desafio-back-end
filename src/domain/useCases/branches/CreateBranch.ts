export interface CreateBranch {
  create(name: CreateBranch.Params): Promise<boolean>;
}

export namespace CreateBranch {
  export type Params = string;
}
