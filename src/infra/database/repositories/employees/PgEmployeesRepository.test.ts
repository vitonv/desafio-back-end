// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import { Repository } from 'typeorm';

import { PgEmployeesRepository } from '.';
import { PgBranch } from '../../entities/PgBranch';
import { PgEmployee } from '../../entities/PgEmployee';
import { PgConnection } from '../../helpers/connection';

let connection: PgConnection;
let sut: PgEmployeesRepository;
let pgEmployeeRepo: Repository<PgEmployee>;
let pgBranchRepo: Repository<PgBranch>;
let branch: PgBranch;
describe('PgEmployeesRepository', () => {
  beforeAll(async () => {
    connection = PgConnection.getInstance();
    await connection.connect();
    pgEmployeeRepo = connection.getRepository(PgEmployee);
    pgBranchRepo = connection.getRepository(PgBranch);
  });
  afterAll(async () => {
    await connection.disconnect();
  });
  beforeEach(() => {
    sut = new PgEmployeesRepository();
  });

  describe('create()', () => {
    it('Should create a new employee ', async () => {
      const employee = {
        name: faker.internet.userName(),
      };
      const branch = await pgBranchRepo.save({
        name: faker.internet.domainName(),
      });
      await sut.create(employee.name, branch.id);
      const findNewEmployee = await pgBranchRepo.findOne({
        where: {
          name: employee.name,
        },
      });
      expect(findNewEmployee).toBeFalsy();
    });
  });
});
