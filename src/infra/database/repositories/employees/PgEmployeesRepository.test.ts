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

  // describe('create()', () => {
  //   it('Should create a new employee ', async () => {
  //     const newBranch = await pgBranchRepo.save({
  //       name: faker.company.companyName(),
  //     });
  //     const employee = {
  //       name: faker.name.firstName(),
  //       branch_id: newBranch.id,
  //     };
  //     await sut.create(employee);
  //   });
  // });
  describe('list()', () => {
    type EmployeeData = {
      id: string;
      name: string;
      branch: {
        name: string;
      };
    };
    it('Should return a list of employees', async () => {
      const [employee] = await sut.list();
      expect(employee).toHaveProperty('id');
      expect(employee).toHaveProperty('name');
      expect(employee).toHaveProperty('branch');
    });
    it('Should return a employee by id', async () => {
      const newBranch = await pgBranchRepo.save({
        name: faker.company.companyName(),
      });
      const employee = {
        name: faker.name.firstName(),
        branch_id: newBranch.id,
      };
      const newEmployee = await pgEmployeeRepo.save(employee);
      const [employees] = await sut.list(newEmployee.id);
      expect(employees.id).toEqual(newEmployee.id);
    });
  });
});
