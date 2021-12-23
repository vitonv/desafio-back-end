import { Repository } from 'typeorm';

import { CreateEmployeeRepository } from '../../../../app/contracts/db/employees/CreateEmployee';
import { ListEmployeesRepository } from '../../../../app/contracts/db/employees/ListEmployees';
import { PgEmployee } from '../../entities/PgEmployee';
import { PgConnection } from '../../helpers/connection';

export class PgEmployeesRepository
  implements CreateEmployeeRepository, ListEmployeesRepository
{
  private repository: Repository<PgEmployee>;
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {
    this.repository = this.connection.getRepository(PgEmployee);
  }
  async list(): Promise<ListEmployeesRepository.Result> {
    const listQuery = this.repository
      .createQueryBuilder('e')
      .select(['e.id', 'e.name'])
      .innerJoin('e.branch', 'branch')
      .addSelect('branch.name');
    const employees = await listQuery.getMany();
    return employees;
  }
  async create(data: CreateEmployeeRepository.Params): Promise<void> {
    const repository = this.repository.create(data);
    await this.repository.save(repository);
  }
}
