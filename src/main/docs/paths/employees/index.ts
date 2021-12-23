import { createEmployeePath } from './create-employee-path';
import { deleteEmployeePath } from './delete-employee-path';
import { listEmployeePath } from './list-employees-path';
import { updateEmployeePath } from './update-employee-path';

export default {
  '/employees/add': createEmployeePath,
  '/employees/list': listEmployeePath,
  '/employees/update/{id}': updateEmployeePath,
  '/employees/delete/{id}': deleteEmployeePath,
};
