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

const makeFakeCreate = {
  name: 'any_name',
  branch_name: 'branch_name',
};
describe('CreateEmployee Service', () => {
  it('Should call findBranchRepository with correct value', async () => {
    const { sut, findBranchRepositorySpy } = makeSut();
    const listSpy = jest.spyOn(findBranchRepositorySpy, 'list');
    await sut.create(makeFakeCreate);
    expect(listSpy).toHaveBeenCalledWith(null, 'branch_name');
  });
  it('Should throw if findBranchRepository throws', async () => {
    const { sut, findBranchRepositorySpy } = makeSut();
    jest
      .spyOn(findBranchRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create(makeFakeCreate);
    await expect(error).rejects.toThrow();
  });
  it('Should return false if findBranchRepository returns falsy', async () => {
    const { sut, findBranchRepositorySpy } = makeSut();
    jest
      .spyOn(findBranchRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.resolve([]));
    const result = await sut.create(makeFakeCreate);
    expect(result).toBe(false);
  });
  it('Should call createEmployeeRepository with correct values', async () => {
    const { sut, createEmployeeRepositorySpy } = makeSut();
    const createSpy = jest.spyOn(createEmployeeRepositorySpy, 'create');
    await sut.create(makeFakeCreate);
    expect(createSpy).toHaveBeenCalledWith({
      name: makeFakeCreate.name,
      branch_id: 'branch_id',
    });
  });
  it('Should throw if createEmployeeRepository throws', async () => {
    const { sut, createEmployeeRepositorySpy } = makeSut();
    jest
      .spyOn(createEmployeeRepositorySpy, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create(makeFakeCreate);
    await expect(error).rejects.toThrow();
  });
  it('Should return true on success', async () => {
    const { sut } = makeSut();

    const result = await sut.create(makeFakeCreate);
    expect(result).toBe(true);
  });
});
