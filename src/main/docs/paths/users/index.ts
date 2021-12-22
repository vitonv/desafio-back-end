import { signInPath } from './signIn';
import { signUpPath } from './signUp';

export default {
  '/users/signup': signUpPath,
  '/users/login': signInPath,
};
