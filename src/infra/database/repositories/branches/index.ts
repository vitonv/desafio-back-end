import { Repository } from 'typeorm';

import { CreateBranchRepository } from '../../../../app/contracts/db/branches/CreateBranch';
import { DeleteBranchRepository } from '../../../../app/contracts/db/branches/DeleteBranch';
import { ListBranchesRepository } from '../../../../app/contracts/db/branches/ListBranches';
import { UpdateBranchRepository } from '../../../../app/contracts/db/branches/UpdateBranch';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { PgBranch } from '../../entities/PgBranch';
import { PgConnection } from '../../helpers/connection';

export class PgBranchesRepository
  implements
    CreateBranchRepository,
    UpdateBranchRepository,
    DeleteBranchRepository,
    ListBranchesRepository
{
  private repository: Repository<PgBranch>;
  constructor(
    private readonly connection: PgConnection = PgConnection.getInstance(),
  ) {
    this.repository = this.connection.getRepository(PgBranch);
  }
  async list(id?: string, name?: string): Promise<ListBranches.Result> {
    const listQuery = this.repository
      .createQueryBuilder('branch')
      .select(['branch.id', 'branch.name'])
      .loadRelationCountAndMap('branch.employees', 'branch.employees');
    if (id) {
      listQuery.andWhere('branch.id = :id', { id });
    }
    if (name) {
      listQuery.andWhere('branch.name = :name', { name });
    }
    const branches = await listQuery.getMany();
    return branches;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
  async create(name: string): Promise<any> {
    const newBranch = this.repository.create({ name });
    await this.repository.save(newBranch);
    return newBranch;
  }
  async update(id: string, name: string): Promise<void> {
    const branch = await this.repository.findOne({ id });
    const updatedBranch = {
      ...branch,
      name,
    };
    await this.repository.save(updatedBranch);
  }
}
