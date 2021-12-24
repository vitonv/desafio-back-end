import { UpdateEmployeeController } from '.';
import { UpdateEmployee } from '../../../../domain/useCases/employees/UpdateEmployee';
import { BranchDoesNotExists } from '../../../errors/BranchDoesNotExists';
import {
  badRequest,
  noContent,
  serverError,
} from '../../../helpers/http/HttpHelper';

const makeUpdateEmployee = () => {
  class UpdateEmployeeSpy implements UpdateEmployee {
    async update(data: UpdateEmployee.Params): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new UpdateEmployeeSpy();
};
const makeSut = () => {
  const updateEmployeeSpy = makeUpdateEmployee();
  const sut = new UpdateEmployeeController(updateEmployeeSpy);
  return {
    sut,
    updateEmployeeSpy,
  };
};

const makeFakeRequest = () => ({
  body: {
    name: 'new_name',
    branch_name: 'branch_name',
  },
  params: {
    id: 'any_id',
  },
});
describe('UpdateEmployee Controller', () => {
  it('Should call updateEmployee with correct values', async () => {
    const { sut, updateEmployeeSpy } = makeSut();
    const updateSpy = jest.spyOn(updateEmployeeSpy, 'update');
    await sut.handle(makeFakeRequest());
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'new_name',
      branch_name: 'branch_name',
    });
  });
  it('Should return 400 if updateEmployee returns false', async () => {
    const { sut, updateEmployeeSpy } = makeSut();
    jest
      .spyOn(updateEmployeeSpy, 'update')
      .mockReturnValueOnce(Promise.resolve(false));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new BranchDoesNotExists()));
  });
  it('Should returns 500 if updateEmployee throws', async () => {
    const { sut, updateEmployeeSpy } = makeSut();
    jest
      .spyOn(updateEmployeeSpy, 'update')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(serverError(new Error()));
  });
  it('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(noContent());
  });
});
