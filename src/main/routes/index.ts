import { Router } from 'express';

import { branchRoutes } from './branches';
import { employeeRoutes } from './employees';
import { usersRoutes } from './users';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/branches', branchRoutes);
routes.use('/employees', employeeRoutes);
export { routes };
