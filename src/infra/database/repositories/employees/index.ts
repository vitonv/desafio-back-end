import { Repository } from 'typeorm';

import { PgEmployee } from '../../entities/PgEmployee';
import { PgConnection } from '../../helpers/connection';

export class PgEmployeesRepository {
  private repository: Repository<PgEmployee>;
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {
    this.repository = this.connection.getRepository(PgEmployee);
  }

  async create(name: string, branch_id?: string): Promise<any> {
    const employee = this.repository.create({ name });
    await this.repository.save(employee);
    return employee;
  }

  // async update(id: string, name: string, branch_id: string): Promise<any> {
  //   const employee = await this.repository.findOne({ id });
  //   const updatedEmployee = {
  //     ...employee,
  //     branch_id,
  //   };
  //   await this.repository.save(updatedEmployee);
  // }
}
