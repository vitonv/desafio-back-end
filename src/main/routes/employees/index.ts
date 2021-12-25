import { Router } from 'express';

import { createEmployeeRoute } from './create';
import { deleteEmployeeRoute } from './delete';
import { listEmployeesRoute } from './list';
import { updateEmployeeRoute } from './update';

const employeeRoutes = Router();

employeeRoutes.use('/add', createEmployeeRoute);
employeeRoutes.use('/list', listEmployeesRoute);
employeeRoutes.use('/update', updateEmployeeRoute);
employeeRoutes.use('/delete', deleteEmployeeRoute);

export { employeeRoutes };
