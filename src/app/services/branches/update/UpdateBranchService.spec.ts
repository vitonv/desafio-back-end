import { UpdateBranchService } from '.';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';
import { UpdateBranchRepository } from '../../../contracts/db/branches/UpdateBranch';

const makeUpdateBranchRepository = () => {
  class UpdateBranchRepositorySpy implements UpdateBranchRepository {
    async update(id: string, name: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdateBranchRepositorySpy();
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
  const listBranchesRepositorySpy = makeListBranchRepository();
  const updateBranchRepositorySpy = makeUpdateBranchRepository();
  const sut = new UpdateBranchService(
    listBranchesRepositorySpy,
    updateBranchRepositorySpy,
  );
  return {
    sut,
    updateBranchRepositorySpy,
    listBranchesRepositorySpy,
  };
};
describe('UpdateBranch Service', () => {
  it('Should call listBranchesRepository with correct values', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    const listSpy = jest.spyOn(listBranchesRepositorySpy, 'list');
    await sut.update('any_id', 'new_name');
    expect(listSpy).toHaveBeenCalledWith(null, 'new_name');
  });
  it('Should throw if listBranchesRepository throws', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    jest
      .spyOn(listBranchesRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.update('any_id', 'new_name');
    expect(error).rejects.toThrow();
  });
  it('Should throw if listBranchesRepository throws', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    jest.spyOn(listBranchesRepositorySpy, 'list').mockReturnValueOnce(
      Promise.resolve([
        {
          id: 'any_id',
          name: 'any_name',
          employees: 0,
        },
      ]),
    );
    const result = await sut.update('any_id', 'new_name');
    expect(result).toBe(false);
  });
  it('Should call updateBranchRepository with correct values', async () => {
    const { sut, updateBranchRepositorySpy } = makeSut();
    const updateSpy = jest.spyOn(updateBranchRepositorySpy, 'update');
    await sut.update('any_id', 'new_name');
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'new_name');
  });
  it('Should throw if updateBranchRepository throws', async () => {
    const { sut, updateBranchRepositorySpy } = makeSut();
    jest
      .spyOn(updateBranchRepositorySpy, 'update')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.update('any_id', 'new_name');
    expect(error).rejects.toThrow();
  });
  it('Should return true on sucess', async () => {
    const { sut } = makeSut();
    const response = await sut.update('any_id', 'new_name');
    expect(response).toBe(true);
  });
});
