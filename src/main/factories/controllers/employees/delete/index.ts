import { DeleteEmployeeController } from '../../../../../presentation/controllers/employees/delete';
import { makeDeleteEmployee } from '../../../services/employees/DeleteEmployee';

export const makeDeleteEmployeeController = () => {
  return new DeleteEmployeeController(makeDeleteEmployee());
};
