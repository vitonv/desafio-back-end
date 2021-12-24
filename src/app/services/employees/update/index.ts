import { UpdateEmployee } from '../../../../domain/useCases/employees/UpdateEmployee';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';
import { UpdateEmployeeRepository } from '../../../contracts/db/employees/UpdateEmployee';

export class UpdateEmployeeService implements UpdateEmployee {
  constructor(
    private readonly listBranchesRepository: ListBranchesRepository,
    private readonly updateEmployeeRepository: UpdateEmployeeRepository,
  ) {}
  async update({
    id,
    name,
    branch_name,
  }: UpdateEmployee.Params): Promise<boolean> {
    const [branch] = await this.listBranchesRepository.list(null, branch_name);
    if (branch) {
      await this.updateEmployeeRepository.update({
        id,
        name,
        branch_id: branch.id,
      });
      return true;
    }
    return false;
  }
}
