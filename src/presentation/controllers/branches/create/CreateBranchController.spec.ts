import { CreateBranchController } from '.';
import { CreateBranch } from '../../../../domain/useCases/branches/CreateBranch';
import { BranchAlreadyExists } from '../../../errors/BranchAlreadyExists';
import { badRequest, serverError } from '../../../helpers/http/HttpHelper';

const makeCreateBranch = () => {
  class CreateBranchSpy implements CreateBranch {
    async create(name: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new CreateBranchSpy();
};
const makeSut = () => {
  const createBranchSpy = makeCreateBranch();
  const sut = new CreateBranchController(createBranchSpy);
  return {
    sut,
    createBranchSpy,
  };
};

const makeFakeRequest = () => ({
  body: {
    name: 'any_name',
  },
});
describe('CreateBranch Controller', () => {
  it('Should call createBranch with correct value', async () => {
    const { sut, createBranchSpy } = makeSut();
    const createSpy = jest.spyOn(createBranchSpy, 'create');
    await sut.handle(makeFakeRequest());
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest().body.name);
  });
  it('Should return 400 if createBranch returns false', async () => {
    const { sut, createBranchSpy } = makeSut();
    jest
      .spyOn(createBranchSpy, 'create')
      .mockReturnValueOnce(Promise.resolve(false));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new BranchAlreadyExists()));
  });
  it('Should return 500 if createBranch throws', async () => {
    const { sut, createBranchSpy } = makeSut();
    jest
      .spyOn(createBranchSpy, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
  it('Should return 201 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toEqual(201);
  });
});
