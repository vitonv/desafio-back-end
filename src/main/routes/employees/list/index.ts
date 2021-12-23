import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeListEmployeesController } from '../../../factories/controllers/employees/list';

const listEmployeesRoute = Router();

listEmployeesRoute.get('/', adaptRoute(makeListEmployeesController()));
export { listEmployeesRoute };
