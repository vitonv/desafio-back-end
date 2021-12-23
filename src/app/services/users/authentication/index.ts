import { Authentication } from '../../../../domain/useCases/user/Login';
import { Encrypter } from '../../../contracts/cryptography/Encrypter';
import { HashComparer } from '../../../contracts/cryptography/HashComparer';
import { UpdateAccessTokenRepository } from '../../../contracts/db/users/CreateAccessToken';
import { FindAccountByEmailRepository } from '../../../contracts/db/users/FindAccountByEmail';

export class AuthenticationService implements Authentication {
  constructor(
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAcessTokenRepository: UpdateAccessTokenRepository,
  ) {}
  async auth(
    credentials: Authentication.Params,
  ): Promise<Authentication.Result> {
    const account = await this.findAccountByEmailRepository.findByEmail(
      credentials.email,
    );
    console.log(account);
    if (account) {
      const isValid = await this.hashComparer.compare(
        credentials.password,
        account.password,
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAcessTokenRepository.update(account.id, accessToken);
        return {
          name: account.name,
          accessToken,
        };
      }
    }
    return null;
  }
}
