import { SignUpController } from '../../../../../presentation/controllers/users/signup';
import { makeCreateAccount } from '../../../services/users/CreateAccount';

export const makeCreateAccountController = () => {
  return new SignUpController(makeCreateAccount());
};
