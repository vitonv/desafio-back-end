import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeUpdateBranchController } from '../../../factories/controllers/branches/update';

const updateBranchRoute = Router();

updateBranchRoute.patch('/:id', adaptRoute(makeUpdateBranchController()));

export { updateBranchRoute };
