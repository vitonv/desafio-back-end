import { DeleteEmployeeService } from '../../../../app/services/employees/delete';
import { PgEmployeesRepository } from '../../../../infra/database/repositories/employees';

export const makeDeleteEmployee = () => {
  const employeesRepository = new PgEmployeesRepository();
  return new DeleteEmployeeService(employeesRepository);
};
