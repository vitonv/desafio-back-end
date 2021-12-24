import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeUpdateEmployeeController } from '../../../factories/controllers/employees/update';

const updateEmployeeRoute = Router();

updateEmployeeRoute.patch('/:id', adaptRoute(makeUpdateEmployeeController()));

export { updateEmployeeRoute };
