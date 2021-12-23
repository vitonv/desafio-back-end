import { Router } from 'express';

import { createEmployeeRoute } from './create';
import { listEmployeesRoute } from './list';

const employeeRoutes = Router();

employeeRoutes.use('/add', createEmployeeRoute);
employeeRoutes.use('/list', listEmployeesRoute);
export { employeeRoutes };
