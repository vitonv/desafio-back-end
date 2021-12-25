import { Employee } from '../../../../domain/entities/Employee';
import { ListBranchEmployees } from '../../../../domain/useCases/branches/ListBranchEmployees';
import { ListBranchEmployeesRepository } from '../../../contracts/db/branches/ListBranchEmployees';

export class ListBranchEmployeesService implements ListBranchEmployees {
  constructor(
    private readonly listBranchEmployeesRepository: ListBranchEmployeesRepository,
  ) {}
  async listEmployees(
    branch_id?: string,
    branch_name?: string,
  ): Promise<Employee[]> {
    const employees = await this.listBranchEmployeesRepository.listEmployees(
      branch_id,
      branch_name,
    );
    return employees;
  }
}
