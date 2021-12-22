// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { Repository } from 'typeorm';

import { PgUsersRepository } from '.';
import { PgUser } from '../../entities/PgUser';
import { PgConnection } from '../../helpers/connection';

let connection: PgConnection;
let sut: PgUsersRepository;
let pgUserRepo: Repository<PgUser>;
describe('PgUsersRepository', () => {
  beforeAll(async () => {
    connection = PgConnection.getInstance();
    await connection.connect();
    pgUserRepo = connection.getRepository(PgUser);
  });
  afterAll(async () => {
    await connection.disconnect();
  });
  beforeEach(() => {
    sut = new PgUsersRepository();
  });

  describe('create()', () => {
    it('Should create a new user ', async () => {
      const user = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      await sut.create(user);
      const findUser = await pgUserRepo.findOne({ where: { name: user.name } });
      expect(findUser.name).toEqual(user.name);
      expect(findUser.password).toEqual(user.password);
    });
  });
  describe('findByEmail()', () => {
    it('Should return undefined if email does not exists', async () => {
      const findUser = await sut.findByEmail('any_mail@mail.com');
      expect(findUser).toBeUndefined();
    });
    it('Should return an account if email exists!', async () => {
      const newUser = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      await sut.create(newUser);
      const findUser = await sut.findByEmail(newUser.email);
      // expect(findUser).toBeUndefined();
      expect(findUser.email).toEqual(newUser.email);
    });
  });
});
