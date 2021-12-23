import { CreateEmployeeService } from '.';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';
import { CreateEmployeeRepository } from '../../../contracts/db/employees/CreateEmployee';

const makeCreateEmployeeRepository = () => {
  class CreateEmployeeRepositorySpy implements CreateEmployeeRepository {
    async create(data: CreateEmployeeRepository.Params): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CreateEmployeeRepositorySpy();
};

const makeListBranchRepository = () => {
  class ListBranchRepositorySpy implements ListBranchesRepository {
    async list(id?: string, name?: string): Promise<ListBranches.Result> {
      return Promise.resolve([
        {
          id: 'branch_id',
          name: 'branch_name',
        },
      ]);
    }
  }
  return new ListBranchRepositorySpy();
};
const makeSut = () => {
  const createEmployeeRepositorySpy = makeCreateEmployeeRepository();
  const findBranchRepositorySpy = makeListBranchRepository();
  const sut = new CreateEmployeeService(
    findBranchRepositorySpy,
    createEmployeeRepositorySpy,
  );
  return {
    sut,
    createEmployeeRepositorySpy,
    findBranchRepositorySpy,
  };
};

describe('CreateEmployee Service', () => {
  it('', () => {});
});
