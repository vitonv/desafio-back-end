import { CreateEmployeeController } from '../../../../../presentation/controllers/employees/create';
import { makeCreateEmployee } from '../../../services/employees/CreateEmployee';

export const makeCreateEmployeeController = () => {
  return new CreateEmployeeController(makeCreateEmployee());
};
