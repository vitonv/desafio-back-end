export interface CreateEmployee {
  create(data: CreateEmployee.Params): Promise<boolean>;
}

export namespace CreateEmployee {
  export type Params = {
    name: string;
    branch_name: string;
  };
}
