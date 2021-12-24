import { Employee } from '../../entities/Employee';

export interface ListEmployees {
  list(id?: string): Promise<Employee[]>;
}
