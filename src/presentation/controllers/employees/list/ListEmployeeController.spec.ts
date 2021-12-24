import { ListEmployeesController } from '.';
import { Employee } from '../../../../domain/entities/Employee';
import { ListEmployees } from '../../../../domain/useCases/employees/ListEmployees';
import { serverError } from '../../../helpers/http/HttpHelper';

const makeListEmployees = () => {
  class ListEmployeesSpy implements ListEmployees {
    async list(): Promise<Employee[]> {
      return Promise.resolve([]);
    }
  }
  return new ListEmployeesSpy();
};
const makeSut = () => {
  const listEmployeesSpy = makeListEmployees();
  const sut = new ListEmployeesController(listEmployeesSpy);
  return {
    sut,
    listEmployeesSpy,
  };
};
describe('ListEmployee Controller', () => {
  it('Should call listEmployees with correct values', async () => {
    const { sut, listEmployeesSpy } = makeSut();
    const listSpy = jest.spyOn(listEmployeesSpy, 'list');
    await sut.handle(null);
    expect(listSpy).toHaveBeenCalled();
  });
  it('Should return 500 if listEmployees throws', async () => {
    const { sut, listEmployeesSpy } = makeSut();
    jest
      .spyOn(listEmployeesSpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const response = await sut.handle(null);
    expect(response).toEqual(serverError(new Error()));
  });
  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(null);
    expect(response.statusCode).toBe(200);
  });
});
