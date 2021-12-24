import { UpdateEmployeeController } from '../../../../../presentation/controllers/employees/update';
import { makeUpdateEmployee } from '../../../services/employees/UpdateEmployee';

export const makeUpdateEmployeeController = () => {
  return new UpdateEmployeeController(makeUpdateEmployee());
};
