import { Router } from 'express';

import { createBranchRoute } from './create';
import { deleteBranchRoute } from './delete';
import { updateBranchRoute } from './update';

const branchRoutes = Router();

branchRoutes.use('/add', createBranchRoute);
branchRoutes.use('/update', updateBranchRoute);
branchRoutes.use('/delete', deleteBranchRoute);

export { branchRoutes };
