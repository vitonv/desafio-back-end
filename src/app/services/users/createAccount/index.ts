import { CreateAccount } from '../../../../domain/useCases/user/CreateAccount';
import { CreateAccountRepository } from '../../../contracts/db/users/CreateAccount';
import { FindAccountByEmailRepository } from '../../../contracts/db/users/FindAccountByEmail';

export class CreateAccountService implements CreateAccount {
  constructor(
    private readonly findAccountRepository: FindAccountByEmailRepository,
    private readonly createAccountRepository: CreateAccountRepository,
  ) {}
  async create(data: CreateAccount.Params): Promise<boolean> {
    const userExists = await this.findAccountRepository.findByEmail(data.email);
    if (!userExists) {
      await this.createAccountRepository.create(data);
      return true;
    }
    return false;
  }
}
