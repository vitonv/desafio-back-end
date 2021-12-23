import { ListEmployeesController } from '../../../../../presentation/controllers/employees/list';
import { makeListEmployees } from '../../../services/employees/ListEmployees';

export const makeListEmployeesController = () => {
  return new ListEmployeesController(makeListEmployees());
};
