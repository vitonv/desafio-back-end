import { DeleteBranchService } from '.';
import { DeleteBranchRepository } from '../../../contracts/db/branches/DeleteBranch';

const makeDeleteBranchRepository = () => {
  class DeleteBranchRepositorySpy implements DeleteBranchRepository {
    async delete(id: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new DeleteBranchRepositorySpy();
};
const makeSut = () => {
  const deleteBranchRepositorySpy = makeDeleteBranchRepository();
  const sut = new DeleteBranchService(deleteBranchRepositorySpy);
  return {
    sut,
    deleteBranchRepositorySpy,
  };
};
describe('DeleteBranch Service', () => {
  it('Should call deleteBranchRepository with correct value', async () => {
    const { sut, deleteBranchRepositorySpy } = makeSut();
    const deleteSpy = jest.spyOn(deleteBranchRepositorySpy, 'delete');
    await sut.delete('any_id');
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });
  it('Should throws if deleteBranchRepository throws', async () => {
    const { sut, deleteBranchRepositorySpy } = makeSut();
    jest
      .spyOn(deleteBranchRepositorySpy, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.delete('any_id');
    await expect(error).rejects.toThrow();
  });
  it('Should throws if deleteBranchRepository throws', async () => {
    const { sut } = makeSut();
    const result = await sut.delete('any_id');
    expect(result).toBe(true);
  });
});
