import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeDeleteBranchController } from '../../../factories/controllers/branches/delete';

const deleteBranchRoute = Router();

deleteBranchRoute.delete('/:id', adaptRoute(makeDeleteBranchController()));
export { deleteBranchRoute };
