import { Employee } from '../../../../domain/entities/Employee';
import { ListEmployees } from '../../../../domain/useCases/employees/ListEmployees';

export interface ListEmployeesRepository {
  list(): Promise<ListEmployeesRepository.Result>;
}

export namespace ListEmployeesRepository {
  export type Result = Employee[];
}
