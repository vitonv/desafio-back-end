// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { Repository } from 'typeorm';

import { PgBranchesRepository } from '.';
import { PgBranch } from '../../entities/PgBranch';
import { PgConnection } from '../../helpers/connection';

let connection: PgConnection;
let sut: PgBranchesRepository;
let pgBranchRepo: Repository<PgBranch>;
describe('PgUsersRepository', () => {
  beforeAll(async () => {
    connection = PgConnection.getInstance();
    await connection.connect();
    pgBranchRepo = connection.getRepository(PgBranch);
  });
  afterAll(async () => {
    await connection.disconnect();
  });
  beforeEach(() => {
    sut = new PgBranchesRepository();
  });

  describe('create()', () => {
    it('Should create a new branch ', async () => {
      const branch = {
        name: faker.company.companyName(),
      };
      await sut.create(branch.name);
      const findBranch = await pgBranchRepo.findOne({ name: branch.name });
      expect(findBranch.name).toEqual(branch.name);
    });
  });
  describe('update()', () => {
    it('Should update a branch', async () => {
      const name = faker.company.companyName();
      const newName = faker.company.companyName();
      const newBranch = await pgBranchRepo.save({ name });
      await sut.update(newBranch.id, newName);
      const findBranch = await pgBranchRepo.findOne({ id: newBranch.id });
      expect(findBranch.name).toBe(newName);
    });
  });
});
