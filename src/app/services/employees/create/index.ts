import { CreateEmployee } from '../../../../domain/useCases/employees/CreateEmployee';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';
import { CreateEmployeeRepository } from '../../../contracts/db/employees/CreateEmployee';

export class CreateEmployeeService implements CreateEmployee {
  constructor(
    private readonly findBranchRepository: ListBranchesRepository,
    private readonly createEmployeeRepository: CreateEmployeeRepository,
  ) {}
  async create(data: CreateEmployee.Params): Promise<boolean> {
    const [branch] = await this.findBranchRepository.list(
      null,
      data.branch_name,
    );
    if (branch) {
      await this.createEmployeeRepository.create({
        name: data.name,
        branch_id: branch.id,
      });
      return true;
    }
    return false;
  }
}
