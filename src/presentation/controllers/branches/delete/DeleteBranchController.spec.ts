import { DeleteBranchController } from '.';
import { DeleteBranch } from '../../../../domain/useCases/branches/DeleteBranch';

const makeDeleteBranch = () => {
  class DeleteBranchSpy implements DeleteBranch {
    async delete(id: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new DeleteBranchSpy();
};
const makeSut = () => {
  const deleteBranchSpy = makeDeleteBranch();
  const sut = new DeleteBranchController(deleteBranchSpy);
  return {
    sut,
    deleteBranchSpy,
  };
};
const makeFakeRequest = () => ({
  params: {
    id: 'any_id',
  },
});
describe('DeleteBranch Controller', () => {
  it('Should call deleteBranch with correct value', async () => {
    const { sut, deleteBranchSpy } = makeSut();
    const deleteSpy = jest.spyOn(deleteBranchSpy, 'delete');
    await sut.handle(makeFakeRequest());
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });
  it('Should return 500 if deleteBranch throws', async () => {
    const { sut, deleteBranchSpy } = makeSut();
    jest
      .spyOn(deleteBranchSpy, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(500);
  });
  it('Should return 400 if deleteBranch returns false', async () => {
    const { sut, deleteBranchSpy } = makeSut();
    jest
      .spyOn(deleteBranchSpy, 'delete')
      .mockReturnValueOnce(Promise.resolve(false));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(400);
  });
  it('Should return 204 on sucess', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(204);
  });
});
