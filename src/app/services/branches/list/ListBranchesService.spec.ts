import { ListBranchesService } from '.';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';

const makeListBranchesRepository = () => {
  class ListBranchesRepositorySpy implements ListBranchesRepository {
    async list(id?: string, name?: string): Promise<ListBranches.Result> {
      return Promise.resolve([]);
    }
  }
  return new ListBranchesRepositorySpy();
};
const makeSut = () => {
  const listBranchesRepositorySpy = makeListBranchesRepository();
  const sut = new ListBranchesService(listBranchesRepositorySpy);
  return {
    sut,
    listBranchesRepositorySpy,
  };
};
describe('ListBranches Service', () => {
  it('should call listBranchesRepository with correct values', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    const listSpy = jest.spyOn(listBranchesRepositorySpy, 'list');
    await sut.list('any_id', 'any_name');
    expect(listSpy).toHaveBeenCalledWith('any_id', 'any_name');
  });
  it('should throw if listBranchesRepository throws', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    jest
      .spyOn(listBranchesRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.list('any_id', 'any_name');
    await expect(error).rejects.toThrow();
  });
  it('should throw if listBranchesRepository throws', async () => {
    const { sut } = makeSut();
    const branches = await sut.list('any_id', 'any_name');
    expect(branches).toBeTruthy();
  });
});
