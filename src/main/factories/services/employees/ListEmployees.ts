import { ListEmployeesService } from '../../../../app/services/employees/list';
import { PgEmployeesRepository } from '../../../../infra/database/repositories/employees';

export const makeListEmployees = () => {
  const employeesRepository = new PgEmployeesRepository();
  return new ListEmployeesService(employeesRepository);
};
