import { CreateBranchService } from '.';
import { Branch } from '../../../../domain/entities/Branch';
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
  it('Should call ListBranchRepository with correct values', async () => {
    const { sut, listBranchRepositorySpy } = makeSut();
    const listSpy = jest.spyOn(listBranchRepositorySpy, 'list');
    await sut.create('any_name');
    expect(listSpy).toHaveBeenCalledWith(null, 'any_name');
  });
  it('Should throw if ListBranchRepository throws', async () => {
    const { sut, listBranchRepositorySpy } = makeSut();
    jest
      .spyOn(listBranchRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create('any_name');
    await expect(error).rejects.toThrow();
  });
  it('Should throw if ListBranchRepository throws', async () => {
    const { sut, listBranchRepositorySpy } = makeSut();
    jest.spyOn(listBranchRepositorySpy, 'list').mockReturnValueOnce(
      Promise.resolve([
        {
          id: 'any_id',
          name: 'any_name',
          employees: 10,
        },
      ]),
    );
    const result = await sut.create('any_name');
    expect(result).toBe(false);
  });
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
