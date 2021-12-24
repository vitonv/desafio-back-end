import { DeleteEmployee } from '../../../../domain/useCases/employees/DeleteEmployee';
import { DeleteEmployeeRepository } from '../../../contracts/db/employees/DeleteEmployee';

export class DeleteEmployeeService implements DeleteEmployee {
  constructor(
    private readonly deleteEmployeeRepository: DeleteEmployeeRepository,
  ) {}
  async delete(id: string): Promise<void> {
    await this.deleteEmployeeRepository.delete(id);
  }
}
