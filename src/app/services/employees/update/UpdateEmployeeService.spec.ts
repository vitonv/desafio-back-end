import { UpdateEmployeeService } from '.';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';
import { UpdateEmployeeRepository } from '../../../contracts/db/employees/UpdateEmployee';

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
const makeUpdateEmployeeRepository = () => {
  class UpdateEmployeeRepositorySpy implements UpdateEmployeeRepository {
    async update(data: UpdateEmployeeRepository.Params): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdateEmployeeRepositorySpy();
};
const makeSut = () => {
  const listBranchesRepositorySpy = makeListBranchRepository();
  const updateEmployeeRepositorySpy = makeUpdateEmployeeRepository();
  const sut = new UpdateEmployeeService(
    listBranchesRepositorySpy,
    updateEmployeeRepositorySpy,
  );
  return {
    sut,
    listBranchesRepositorySpy,
    updateEmployeeRepositorySpy,
  };
};

const makeFakeUpdate = {
  id: 'any_id',
  name: 'any_name',
  branch_name: 'branch_name',
};
describe('UpdateEmployee Service', () => {
  it('Should call listBranchesRepository with correct values', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    const listSpy = jest.spyOn(listBranchesRepositorySpy, 'list');
    await sut.update(makeFakeUpdate);
    expect(listSpy).toHaveBeenCalledWith(null, makeFakeUpdate.branch_name);
  });
  it('Should throw if listBranchesRepository throws', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    jest
      .spyOn(listBranchesRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.update(makeFakeUpdate);
    await expect(error).rejects.toThrow();
  });
  it('Should return false listBranchesRepository returns falsy', async () => {
    const { sut, listBranchesRepositorySpy } = makeSut();
    jest
      .spyOn(listBranchesRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.resolve([]));
    const result = await sut.update(makeFakeUpdate);
    expect(result).toBe(false);
  });
  it('Should call updateEmployeeRepository with correct values', async () => {
    const { sut, updateEmployeeRepositorySpy } = makeSut();
    const updateSpy = jest.spyOn(updateEmployeeRepositorySpy, 'update');
    await sut.update(makeFakeUpdate);
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name',
      branch_id: 'branch_id',
    });
  });
  it('Should throw if updateEmployeeRepository throws', async () => {
    const { sut, updateEmployeeRepositorySpy } = makeSut();
    jest
      .spyOn(updateEmployeeRepositorySpy, 'update')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.update(makeFakeUpdate);
    await expect(error).rejects.toThrow();
  });
  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.update(makeFakeUpdate);
    expect(result).toBe(true);
  });
});
