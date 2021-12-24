import { DeleteEmployeeService } from '.';
import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { ListBranchesRepository } from '../../../contracts/db/branches/ListBranches';
import { DeleteEmployeeRepository } from '../../../contracts/db/employees/DeleteEmployee';

const makeDeleteEmployeeRepository = () => {
  class DeleteEmployeeRepositorySpy implements DeleteEmployeeRepository {
    async delete(id: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new DeleteEmployeeRepositorySpy();
};

// const makeListBranchRepository = () => {
//   class ListBranchRepositorySpy implements ListBranchesRepository {
//     async list(id?: string, name?: string): Promise<ListBranches.Result> {
//       return Promise.resolve([
//         {
//           id: 'branch_id',
//           name: 'branch_name',
//         },
//       ]);
//     }
//   }
//   return new ListBranchRepositorySpy();
// };
const makeSut = () => {
  // const findBranchRepositorySpy = makeListBranchRepository();
  const deleteEmployeeRepositorySpy = makeDeleteEmployeeRepository();
  const sut = new DeleteEmployeeService(deleteEmployeeRepositorySpy);
  return {
    sut,
    deleteEmployeeRepositorySpy,
  };
};

describe('DeleteEmployee Service', () => {
  it('Should call deleteEmployeeRepositorySpy with correct values', async () => {
    const { sut, deleteEmployeeRepositorySpy } = makeSut();
    const deleteSpy = jest.spyOn(deleteEmployeeRepositorySpy, 'delete');
    await sut.delete('any_id');
    expect(deleteSpy).toHaveBeenCalledWith('any_id');
  });
  it('Should throw if deleteEmployeeRepositorySpy throws', async () => {
    const { sut, deleteEmployeeRepositorySpy } = makeSut();
    jest
      .spyOn(deleteEmployeeRepositorySpy, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.delete('any_id');
    await expect(error).rejects.toThrow();
  });
});
