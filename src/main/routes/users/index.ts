import { Router } from 'express';

import { authenticationRoute } from './authentication';
import { createAccountRoute } from './createAccount.routes';

const usersRoutes = Router();

usersRoutes.use('/signup', createAccountRoute);
usersRoutes.use('/login', authenticationRoute);

export { usersRoutes };
