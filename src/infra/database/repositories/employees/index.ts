import { Repository } from 'typeorm';

import { CreateEmployeeRepository } from '../../../../app/contracts/db/employees/CreateEmployee';
import { DeleteEmployeeRepository } from '../../../../app/contracts/db/employees/DeleteEmployee';
import { ListEmployeesRepository } from '../../../../app/contracts/db/employees/ListEmployees';
import { UpdateEmployeeRepository } from '../../../../app/contracts/db/employees/UpdateEmployee';
import { PgEmployee } from '../../entities/PgEmployee';
import { PgConnection } from '../../helpers/connection';

export class PgEmployeesRepository
  implements
    CreateEmployeeRepository,
    ListEmployeesRepository,
    UpdateEmployeeRepository,
    DeleteEmployeeRepository
{
  private repository: Repository<PgEmployee>;
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {
    this.repository = this.connection.getRepository(PgEmployee);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
  async update(data: UpdateEmployeeRepository.Params): Promise<void> {
    const { id, name, branch_id } = data;
    const employee = await this.repository.findOne({ id });
    employee.branch_id = branch_id;
    employee.name = name;
    await this.repository.save(employee);
  }
  async list(
    id?: string,
    branch_id?: string,
  ): Promise<ListEmployeesRepository.Result> {
    const listQuery = this.repository
      .createQueryBuilder('e')
      .select(['e.id', 'e.name'])
      .innerJoin('e.branch', 'branch')
      .addSelect(['branch.id', 'branch.name']);
    if (id) {
      listQuery.andWhere('e.id = :id', { id });
    }
    if (branch_id) {
      listQuery.andWhere('branch.id = :branch_id', { branch_id });
    }
    const employees = await listQuery.getMany();
    return employees;
  }
  async create(data: CreateEmployeeRepository.Params): Promise<void> {
    const repository = this.repository.create(data);
    await this.repository.save(repository);
  }
}
