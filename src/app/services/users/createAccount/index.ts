import { CreateAccount } from '../../../../domain/useCases/user/CreateAccount';
import { Hasher } from '../../../contracts/cryptography/Hasher';
import { CreateAccountRepository } from '../../../contracts/db/users/CreateAccount';
import { FindAccountByEmailRepository } from '../../../contracts/db/users/FindAccountByEmail';

export class CreateAccountService implements CreateAccount {
  constructor(
    private readonly findAccountRepository: FindAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly createAccountRepository: CreateAccountRepository,
  ) {}
  async create(data: CreateAccount.Params): Promise<boolean> {
    const userExists = await this.findAccountRepository.findByEmail(data.email);
    if (!userExists) {
      console.log(data);
      const hashedPassword = await this.hasher.hash(data.password);
      await this.createAccountRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      });
      return true;
    }
    return false;
  }
}
