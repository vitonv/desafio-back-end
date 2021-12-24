import { ListEmployeesService } from '.';
import { Employee } from '../../../../domain/entities/Employee';
import { ListEmployeesRepository } from '../../../contracts/db/employees/ListEmployees';

const makeListEmployeesRepository = () => {
  class ListEmployeesRepositorySpy implements ListEmployeesRepository {
    async list(): Promise<ListEmployeesRepository.Result> {
      return Promise.resolve([]);
    }
  }
  return new ListEmployeesRepositorySpy();
};
const makeSut = () => {
  const listEmployeesRepositorySpy = makeListEmployeesRepository();
  const sut = new ListEmployeesService(listEmployeesRepositorySpy);
  return {
    sut,
    listEmployeesRepositorySpy,
  };
};

describe('ListEmployee Service', () => {
  it('Should call listEmployeesRepositorySpy', async () => {
    const { sut, listEmployeesRepositorySpy } = makeSut();
    const listSpy = jest.spyOn(listEmployeesRepositorySpy, 'list');
    await sut.list();
    expect(listSpy).toHaveBeenCalled();
  });
  it('Should throw if listEmployeesRepositorySpy throws', async () => {
    const { sut, listEmployeesRepositorySpy } = makeSut();
    jest
      .spyOn(listEmployeesRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.list();
    await expect(error).rejects.toThrow();
  });
  it('Should throw if listEmployeesRepositorySpy throws', async () => {
    const { sut } = makeSut();
    const employees = await sut.list();
    expect(employees).toBeInstanceOf(Array);
  });
});
