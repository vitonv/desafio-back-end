import { Router } from 'express';

import { createEmployeeRoute } from './create';

const employeeRoutes = Router();

employeeRoutes.use('/add', createEmployeeRoute);
export { employeeRoutes };
