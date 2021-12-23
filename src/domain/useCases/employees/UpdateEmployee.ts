export interface UpdateEmployee {
  update(data: UpdateEmployee.Params): Promise<boolean>;
}

export namespace UpdateEmployee {
  export type Params = {
    name: string;
    branch_name: string;
  };
}
