import { Router } from 'express';

import { createBranchRoute } from './create';

const branchRoutes = Router();

branchRoutes.use('/add', createBranchRoute);

export { branchRoutes };
