import { createEmployeePath } from './create-employee-path';
import { deleteEmployeePath } from './delete-employee-path';
import { listEmployeePath } from './list-employees-path';
import { updateEmployeePath } from './update-employee-path';

export default {
  '/employee/add': createEmployeePath,
  '/employee/list': listEmployeePath,
  '/employee/update/{id}': updateEmployeePath,
  '/employee/delete/{id}': deleteEmployeePath,
};
