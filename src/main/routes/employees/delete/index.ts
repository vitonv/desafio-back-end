import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeDeleteEmployeeController } from '../../../factories/controllers/employees/delete';

const deleteEmployeeRoute = Router();

deleteEmployeeRoute.delete('/:id', adaptRoute(makeDeleteEmployeeController()));
export { deleteEmployeeRoute };
