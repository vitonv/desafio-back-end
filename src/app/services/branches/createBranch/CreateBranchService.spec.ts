import { CreateBranchService } from '.';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { CreateBranchRepository } from '../../../contracts/db/branches/CreateBranch';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';

const makeCreateBranchRepository = () => {
  class CreateBranchRepositorySpy implements CreateBranchRepository {
    async create(name: string): Promise<void> {
      Promise.resolve();
    }
  }
  return new CreateBranchRepositorySpy();
};
const makeListBranchRepository = () => {
  class ListBranchRepositorySpy implements ListBranchesRepository {
    async list(id?: string, name?: string): Promise<ListBranches.Result> {
      return Promise.resolve([]);
    }
  }
  return new ListBranchRepositorySpy();
};
const makeSut = () => {
  const listBranchRepositorySpy = makeListBranchRepository();
  const createBranchRepositorySpy = makeCreateBranchRepository();
  const sut = new CreateBranchService(
    listBranchRepositorySpy,
    createBranchRepositorySpy,
  );
  return { sut, createBranchRepositorySpy, listBranchRepositorySpy };
};
describe('CreateBranch Service', () => {
  it('Should call CreateBranchRepository with correct values', async () => {
    const { sut, createBranchRepositorySpy } = makeSut();
    const createSpy = jest.spyOn(createBranchRepositorySpy, 'create');
    await sut.create('any_name');
    expect(createSpy).toHaveBeenCalledWith('any_name');
  });
  it('Should throw if CreateBranchRepository throws', async () => {
    const { sut, createBranchRepositorySpy } = makeSut();
    jest
      .spyOn(createBranchRepositorySpy, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create('any_name');
    expect(error).rejects.toThrow();
  });
});
