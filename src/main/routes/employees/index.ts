import { Router } from 'express';

import { createEmployeeRoute } from './create';
import { deleteEmployeeRoute } from './delete';
import { listEmployeesRoute } from './list';
import { updateEmployeeRoute } from './update';

const employeeRoutes = Router();

employeeRoutes.use(createEmployeeRoute);
employeeRoutes.use(listEmployeesRoute);
employeeRoutes.use(updateEmployeeRoute);
employeeRoutes.use(deleteEmployeeRoute);

export { employeeRoutes };
