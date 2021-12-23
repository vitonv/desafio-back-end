import { ListBranchesController } from '.';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { serverError } from '../../../helpers/http/HttpHelper';

const makeListBranches = () => {
  class ListBranchesSpy implements ListBranches {
    async list(id?: string, name?: string): Promise<ListBranches.Result> {
      return Promise.resolve([]);
    }
  }
  return new ListBranchesSpy();
};
const makeSut = () => {
  const listBranchesSpy = makeListBranches();
  const sut = new ListBranchesController(listBranchesSpy);
  return {
    sut,
    listBranchesSpy,
  };
};
const makeFakeRequest = () => ({
  query: {
    id: 'any_id',
    name: 'any_name',
  },
});
describe('ListBranches Controller', () => {
  it('Should call listBranches with correct values', async () => {
    const { sut, listBranchesSpy } = makeSut();
    const listSpy = jest.spyOn(listBranchesSpy, 'list');
    await sut.handle(makeFakeRequest());
    expect(listSpy).toHaveBeenCalledWith('any_id', 'any_name');
  });
  it('Should return 500 if listBranches throws', async () => {
    const { sut, listBranchesSpy } = makeSut();
    jest
      .spyOn(listBranchesSpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse.statusCode).toBe(200);
  });
});
