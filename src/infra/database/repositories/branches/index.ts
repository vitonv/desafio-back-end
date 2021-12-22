import { Repository } from 'typeorm';

import { CreateBranchRepository } from '../../../../app/contracts/db/branches/CreateBranch';
import { PgBranch } from '../../entities/PgBranch';
import { PgConnection } from '../../helpers/connection';

export class PgBranchesRepository implements CreateBranchRepository {
  private repository: Repository<PgBranch>;
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {
    this.repository = this.connection.getRepository(PgBranch);
  }
  async create(name: string): Promise<any> {
    const newBranch = this.repository.create({ name });
    await this.repository.save(newBranch);
    return newBranch;
  }
  async update(id: string, name: string): Promise<any> {
    const branch = await this.repository.findOne({ id });
    const updatedBranch = {
      ...branch,
      name,
    };
    await this.repository.save(updatedBranch);
  }
}
