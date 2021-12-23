import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeCreateBranchController } from '../../../factories/controllers/branches/createBranch';

const createBranchRoute = Router();

createBranchRoute.post('/', adaptRoute(makeCreateBranchController()));

export { createBranchRoute };
