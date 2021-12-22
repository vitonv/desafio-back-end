import { Repository } from 'typeorm';

import { UpdateAccessTokenRepository } from '../../../../../app/contracts/db/users/CreateAccessToken';
import { PgUserToken } from '../../../entities/PgUserToken';
import { PgConnection } from '../../../helpers/connection';

export class PgUsersTokensRepository implements UpdateAccessTokenRepository {
  private repository: Repository<PgUserToken>;
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {
    this.repository = this.connection.getRepository(PgUserToken);
  }
  async update(id: string, token: string): Promise<void> {
    const expires_date = new Date();
    expires_date.setHours(expires_date.getHours() + 2);
    const userToken = this.repository.create({
      user_id: id,
      accessToken: token,
      expires_date,
    });
    await this.repository.save(userToken);
  }
}
