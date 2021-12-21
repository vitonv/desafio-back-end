import { CreateAccountService } from '.';
import { CreateAccountRepository } from '../../../contracts/db/users/CreateAccount';
import { FindAccountByEmailRepository } from '../../../contracts/db/users/FindAccountByEmail';

const makeFindAccountByEmailRepository = () => {
  class FindAccountByEmailRepositorySpy
    implements FindAccountByEmailRepository
  {
    async findByEmail(
      email: string,
    ): Promise<FindAccountByEmailRepository.Response> {
      return Promise.resolve(null);
    }
  }
  return new FindAccountByEmailRepositorySpy();
};

const makeCreateAccountRepository = () => {
  class CreateAccountRepositorySpy implements CreateAccountRepository {
    async create(data: CreateAccountRepository.Params): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CreateAccountRepositorySpy();
};
const makeSut = () => {
  const findAccountByEmailRepositorySpy = makeFindAccountByEmailRepository();
  const createAccountRepositorySpy = makeCreateAccountRepository();
  const sut = new CreateAccountService(
    findAccountByEmailRepositorySpy,
    createAccountRepositorySpy,
  );
  return {
    sut,
    findAccountByEmailRepositorySpy,
    createAccountRepositorySpy,
  };
};
const makeFakeCreate: CreateAccountRepository.Params = {
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password',
};
describe('CreateAccount Service', () => {
  it('Should call FindAccountByEmailRepository with correct value', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    const findByEmailSpy = jest.spyOn(
      findAccountByEmailRepositorySpy,
      'findByEmail',
    );
    await sut.create(makeFakeCreate);
    expect(findByEmailSpy).toHaveBeenCalledWith(makeFakeCreate.email);
  });
  it('Should throw if FindAccountByEmailRepository throws', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(findAccountByEmailRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create(makeFakeCreate);
    expect(error).rejects.toThrow();
  });
  it('Should return false if FindAccountByEmailRepository return an account', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    const findByEmailSpy = jest
      .spyOn(findAccountByEmailRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(
        Promise.resolve({
          id: 'any_id',
          name: 'any_name',
          email: 'any_mail@mail.com',
        }),
      );
    const response = await sut.create(makeFakeCreate);
    expect(response).toBe(false);
  });
  it('Should call CreateAccountRepository with correct values', async () => {
    const { sut, createAccountRepositorySpy } = makeSut();
    const createSpy = jest.spyOn(createAccountRepositorySpy, 'create');
    await sut.create(makeFakeCreate);
    expect(createSpy).toHaveBeenCalledWith(makeFakeCreate);
  });
  it('Should throw if CreateAccountRepository throws', async () => {
    const { sut, createAccountRepositorySpy } = makeSut();
    jest
      .spyOn(createAccountRepositorySpy, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create(makeFakeCreate);
    await expect(error).rejects.toThrow();
  });
  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const response = await sut.create(makeFakeCreate);
    expect(response).toBe(true);
  });
});
