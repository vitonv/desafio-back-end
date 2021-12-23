import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeCreateEmployeeController } from '../../../factories/controllers/employees/create';

const createEmployeeRoute = Router();

createEmployeeRoute.post('/', adaptRoute(makeCreateEmployeeController()));

export { createEmployeeRoute };
