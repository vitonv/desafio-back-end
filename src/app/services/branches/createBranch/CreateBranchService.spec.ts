import { CreateBranchService } from '.';
import { CreateBranchRepository } from '../../../contracts/db/branches/CreateBranch';

const makeCreateBranchRepository = () => {
  class CreateBranchRepositorySpy implements CreateBranchRepository {
    async create(name: string): Promise<void> {
      Promise.resolve();
    }
  }
  return new CreateBranchRepositorySpy();
};
const makeSut = () => {
  const createBranchRepositorySpy = makeCreateBranchRepository();
  const sut = new CreateBranchService(createBranchRepositorySpy);
  return { sut, createBranchRepositorySpy };
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
