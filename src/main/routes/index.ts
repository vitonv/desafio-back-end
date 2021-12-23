import { Router } from 'express';

import { branchRoutes } from './branches';
import { usersRoutes } from './users';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/branches', branchRoutes);
export { routes };
