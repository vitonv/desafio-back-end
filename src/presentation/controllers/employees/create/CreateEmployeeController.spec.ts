import { CreateEmployeeController } from '.';
import { CreateEmployee } from '../../../../domain/useCases/employees/CreateEmployee';
import { BranchDoesNotExists } from '../../../errors/BranchDoesNotExists';
import { badRequest, serverError } from '../../../helpers/http/HttpHelper';

const makeCreateEmployee = () => {
  class CreateEmployeeSpy implements CreateEmployee {
    async create(data: CreateEmployee.Params): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new CreateEmployeeSpy();
};

const makeSut = () => {
  const createEmployeeSpy = makeCreateEmployee();
  const sut = new CreateEmployeeController(createEmployeeSpy);
  return {
    sut,
    createEmployeeSpy,
  };
};

const makeFakeRequest = () => ({
  body: {
    name: 'any_name',
    branch_name: 'branch_name',
  },
});
describe('CreateEmployee Controller', () => {
  it('Should call createEmployee with correct valyes', async () => {
    const { sut, createEmployeeSpy } = makeSut();
    const createSpy = jest.spyOn(createEmployeeSpy, 'create');
    await sut.handle(makeFakeRequest());
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest().body);
  });
  it('Should return 400 if createEmployee returns false', async () => {
    const { sut, createEmployeeSpy } = makeSut();
    jest
      .spyOn(createEmployeeSpy, 'create')
      .mockReturnValueOnce(Promise.resolve(false));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new BranchDoesNotExists()));
  });
  it('Should return 500 if createEmployee returns throws', async () => {
    const { sut, createEmployeeSpy } = makeSut();
    jest
      .spyOn(createEmployeeSpy, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(serverError(new Error()));
  });
  it('Should return 201 on sucess', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(makeFakeRequest());
    expect(response.statusCode).toBe(201);
  });
});
