import { CreateAccount } from '../../../../domain/useCases/user/CreateAccount';
import { FindAccountByEmailRepository } from '../../../contracts/db/users/FindAccountByEmail';

export class CreateAccountService implements CreateAccount {
  constructor(
    private readonly findAccountRepository: FindAccountByEmailRepository,
  ) {}
  async create(data: CreateAccount.Params): Promise<boolean> {
    await this.findAccountRepository.findByEmail(data.email);
    return false;
  }
}
