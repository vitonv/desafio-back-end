import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeListBranchesController } from '../../../factories/controllers/branches/list';

const listBranchesRoute = Router();

listBranchesRoute.get('/', adaptRoute(makeListBranchesController()));

export { listBranchesRoute };
