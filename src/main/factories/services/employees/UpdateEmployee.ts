import { UpdateEmployeeService } from '../../../../app/services/employees/update';
import { PgBranchesRepository } from '../../../../infra/database/repositories/branches';
import { PgEmployeesRepository } from '../../../../infra/database/repositories/employees';

export const makeUpdateEmployee = () => {
  const branchesRepository = new PgBranchesRepository();
  const employeesRepository = new PgEmployeesRepository();
  return new UpdateEmployeeService(branchesRepository, employeesRepository);
};
