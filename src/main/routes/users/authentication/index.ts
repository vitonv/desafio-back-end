import { Router } from 'express';

import { adaptRoute } from '../../../adapters/express-route-adapter';
import { makeAuthenticationController } from '../../../factories/controllers/users/authentication';

const authenticationRoute = Router();

authenticationRoute.post('/', adaptRoute(makeAuthenticationController()));

export { authenticationRoute };
