import { CreateAccountService } from '../../../../app/services/users/createAccount';
import { PgUsersRepository } from '../../../../infra/database/repositories/users';

export const makeCreateAccount = () => {
  const pgUsersRepository = new PgUsersRepository();
  return new CreateAccountService(pgUsersRepository, pgUsersRepository);
};
