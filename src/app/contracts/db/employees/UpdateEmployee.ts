export interface UpdateEmployeeRepository {
  update(data: UpdateEmployeeRepository.Params): Promise<void>;
}

export namespace UpdateEmployeeRepository {
  export type Params = {
    id: string;
    name: string;
    branch_id: string;
  };
}
