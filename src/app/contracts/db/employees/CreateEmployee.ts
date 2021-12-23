export interface CreateEmployeeRepository {
  create(data: CreateEmployeeRepository.Params): Promise<void>;
}

export namespace CreateEmployeeRepository {
  export type Params = {
    name: string;
    branch_id: string;
  };
}
