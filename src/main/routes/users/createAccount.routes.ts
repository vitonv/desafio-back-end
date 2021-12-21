import { Router } from 'express';

import { adaptRoute } from '../../adapters/express-route-adapter';
import { makeCreateAccountController } from '../../factories/controllers/users/createAccount';

const createAccountRoute = Router();

createAccountRoute.post('/', adaptRoute(makeCreateAccountController()));

export { createAccountRoute };
