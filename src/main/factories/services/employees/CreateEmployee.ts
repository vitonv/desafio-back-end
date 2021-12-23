import { CreateEmployeeService } from '../../../../app/services/employees/create';
import { PgBranchesRepository } from '../../../../infra/database/repositories/branches';
import { PgEmployeesRepository } from '../../../../infra/database/repositories/employees';

export const makeCreateEmployee = () => {
  const branchesRepository = new PgBranchesRepository();
  const employeesRepository = new PgEmployeesRepository();

  return new CreateEmployeeService(branchesRepository, employeesRepository);
};
