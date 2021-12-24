import { DeleteEmployeeController } from '.';
import { DeleteEmployee } from '../../../../domain/useCases/employees/DeleteEmployee';
import { serverError } from '../../../helpers/http/HttpHelper';

const makeDeleteEmployee = () => {
  class DeleteEmployeeSpy implements DeleteEmployee {
    async delete(id: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new DeleteEmployeeSpy();
};
const makeSut = () => {
  const deleteEmployeeSpy = makeDeleteEmployee();
  const sut = new DeleteEmployeeController(deleteEmployeeSpy);
  return {
    sut,
    deleteEmployeeSpy,
  };
};

const makeFakeRequest = () => ({
  params: {
    id: 'any_id',
  },
});
describe('Delete Employee Controller', () => {
  it('Should call deleteEmployee with correct values', async () => {
    const { sut, deleteEmployeeSpy } = makeSut();
    const deleteSpy = jest.spyOn(deleteEmployeeSpy, 'delete');
    await sut.handle(makeFakeRequest());
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });
  it('Should return 500 if deleteEmployee throws', async () => {
    const { sut, deleteEmployeeSpy } = makeSut();
    jest
      .spyOn(deleteEmployeeSpy, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httResponse = await sut.handle(makeFakeRequest());
    expect(httResponse).toEqual(serverError(new Error()));
  });
  it('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httResponse = await sut.handle(makeFakeRequest());
    expect(httResponse.statusCode).toEqual(204);
  });
});
