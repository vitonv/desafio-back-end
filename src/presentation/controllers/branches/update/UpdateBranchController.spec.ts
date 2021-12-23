import { UpdateBranchController } from '.';
import { UpdateBranch } from '../../../../domain/useCases/branches/UpdateBranch';

const makeUpdateBranch = () => {
  class UpdateBranchSpy implements UpdateBranch {
    async update(id: string, name: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new UpdateBranchSpy();
};
const makeSut = () => {
  const updateBranchSpy = makeUpdateBranch();
  const sut = new UpdateBranchController(updateBranchSpy);
  return {
    sut,
    updateBranchSpy,
  };
};
const makeFakeRequest = () => ({
  body: {
    name: 'new_name',
  },
  params: {
    id: 'any_id',
  },
});
describe('UpdateBranch Controller', () => {
  it('should call UpdateBranch with correct values', async () => {
    const { sut, updateBranchSpy } = makeSut();
    const updateSpy = jest.spyOn(updateBranchSpy, 'update');
    await sut.handle(makeFakeRequest());
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'new_name');
  });
  it('should return 500 if UpdateBranch throws', async () => {
    const { sut, updateBranchSpy } = makeSut();
    jest
      .spyOn(updateBranchSpy, 'update')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(500);
  });
  it('should return 400 if UpdateBranch returns false', async () => {
    const { sut, updateBranchSpy } = makeSut();
    jest
      .spyOn(updateBranchSpy, 'update')
      .mockReturnValueOnce(Promise.resolve(false));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(400);
  });
  it('should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(204);
  });
});
