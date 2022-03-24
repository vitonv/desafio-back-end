import { Router } from 'express';

import { createBranchRoute } from './create';
import { deleteBranchRoute } from './delete';
import { listBranchesRoute } from './list';
import { updateBranchRoute } from './update';

const branchRoutes = Router();

branchRoutes.use(createBranchRoute);
branchRoutes.use(updateBranchRoute);
branchRoutes.use(deleteBranchRoute);
branchRoutes.use(listBranchesRoute);

export { branchRoutes };
