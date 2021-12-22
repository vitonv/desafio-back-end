import { AuthenticationService } from '../../../../app/services/users/authentication';
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt/BcryptAdapter';
import { JwtAdapter } from '../../../../infra/cryptography/jwt/JwtAdapter';
import { PgUsersRepository } from '../../../../infra/database/repositories/users';
import { PgUsersTokensRepository } from '../../../../infra/database/repositories/users/tokens';

export const makeAuthentication = () => {
  const usersRepository = new PgUsersRepository();
  const bcrypt = new BcryptAdapter();
  const encrypter = new JwtAdapter('8899ab1baae65ebb1b1231d2daec2b79');
  const usersTokensRepository = new PgUsersTokensRepository();
  return new AuthenticationService(
    usersRepository,
    bcrypt,
    encrypter,
    usersTokensRepository,
  );
};
