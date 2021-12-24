// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { Repository } from 'typeorm';

import { PgUsersTokensRepository } from '.';
import { PgUser } from '../../../entities/PgUser';
import { PgUserToken } from '../../../entities/PgUserToken';
import { PgConnection } from '../../../helpers/connection';

let connection: PgConnection;
let sut: PgUsersTokensRepository;
let pgUserRepo: Repository<PgUser>;
let pgUserTokenRepo: Repository<PgUserToken>;
describe('PgUsersTokensRepository', () => {
  beforeAll(async () => {
    connection = PgConnection.getInstance();
    await connection.connect();
    pgUserRepo = connection.getRepository(PgUser);
    pgUserTokenRepo = connection.getRepository(PgUserToken);
  });
  afterAll(async () => {
    await connection.disconnect();
  });
  beforeEach(() => {
    sut = new PgUsersTokensRepository();
  });

  describe('update()', () => {
    it('Should create a new accessToken', async () => {
      const user = {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const { id } = await pgUserRepo.save(user);
      await sut.update(id, 'any_token');

      const findUserToken = await pgUserTokenRepo.findOne(id);

      expect(findUserToken).toBeTruthy();
    });
  });
});
