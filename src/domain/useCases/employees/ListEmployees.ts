import { Employee } from '../../entities/Employee';

export interface ListEmployees {
  list(): Promise<Employee[]>;
}
