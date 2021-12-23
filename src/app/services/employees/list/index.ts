import { Employee } from '../../../../domain/entities/Employee';
import { ListEmployees } from '../../../../domain/useCases/employees/ListEmployees';
import { employeeRoutes } from '../../../../main/routes/employees';
import { ListEmployeesRepository } from '../../../contracts/db/employees/ListEmployees';

export class ListEmployeesService implements ListEmployees {
  constructor(
    private readonly listEmployeesRepository: ListEmployeesRepository,
  ) {}
  async list(): Promise<Employee[]> {
    const employees = await this.listEmployeesRepository.list();
    return employees;
  }
}
