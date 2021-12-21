import { getRepository, Repository } from 'typeorm';

import { CreateAccountRepository } from '../../../../app/contracts/db/users/CreateAccount';
import { FindAccountByEmailRepository } from '../../../../app/contracts/db/users/FindAccountByEmail';
import { PgUser } from '../../entities/PgUser';
import { PgConnection } from '../../helpers/connection';

export class PgUsersRepository
  implements FindAccountByEmailRepository, CreateAccountRepository
{
  private repository: Repository<PgUser>;
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {
    this.repository = this.connection.getRepository(PgUser);
  }
  async findByEmail(
    email: string,
  ): Promise<FindAccountByEmailRepository.Response> {
    const findUser = await this.repository.findOne({
      select: ['id', 'name', 'email'],
      where: { email },
    });
    return findUser;
  }
  async create(data: CreateAccountRepository.Params): Promise<void> {
    const user = await this.repository.create(data);
    await this.repository.save(user);
  }
}
