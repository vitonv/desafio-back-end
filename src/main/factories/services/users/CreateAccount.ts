import { CreateAccountService } from '../../../../app/services/users/createAccount';
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt/BcryptAdapter';
import { PgUsersRepository } from '../../../../infra/database/repositories/users';

export const makeCreateAccount = () => {
  const pgUsersRepository = new PgUsersRepository();
  const bcrypt = new BcryptAdapter();
  return new CreateAccountService(pgUsersRepository, bcrypt, pgUsersRepository);
};
