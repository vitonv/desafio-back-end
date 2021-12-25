import { Employee } from '../../entities/Employee';

export interface ListEmployees {
  list(id?: string, branch_id?: string): Promise<Employee[]>;
}
