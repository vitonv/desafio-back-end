import { AuthenticationController } from '../../../../../presentation/controllers/users/login';
import { makeAuthentication } from '../../../services/users/Authentication';

export const makeAuthenticationController = () => {
  return new AuthenticationController(makeAuthentication());
};
