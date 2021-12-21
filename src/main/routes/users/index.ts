import { Router } from 'express';

import { createAccountRoute } from './createAccount.routes';

const usersRoutes = Router();

usersRoutes.use('/signup', createAccountRoute);

export { usersRoutes };
