export interface CreateBranch {
  create(name: CreateBranch.Params): Promise<void>;
}

export namespace CreateBranch {
  export type Params = string;
}
