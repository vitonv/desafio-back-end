import { CreateAccountService } from '.';
import { CreateAccountRepository } from '../../../contracts/db/users/CreateAccount';
import { FindAccountByEmailRepository } from '../../../contracts/db/users/FindAccountByEmail';

const makeFindAccountByEmailRepository = () => {
  class FindAccountByEmailRepositoryStub
    implements FindAccountByEmailRepository
  {
    async findByEmail(
      email: string,
    ): Promise<FindAccountByEmailRepository.Response> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email,
      });
    }
  }
  return new FindAccountByEmailRepositoryStub();
};

const makeCreateAccountRepository = () => {
  class CreateAccountRepositoryStub implements CreateAccountRepository {
    async create(data: CreateAccountRepository.Params): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CreateAccountRepositoryStub();
};
const makeSut = () => {
  const findAccountByEmailRepositoryStub = makeFindAccountByEmailRepository();
  const createAccountRepositoryStub = makeCreateAccountRepository();
  const sut = new CreateAccountService(findAccountByEmailRepositoryStub);
  return {
    sut,
    findAccountByEmailRepositoryStub,
    createAccountRepositoryStub,
  };
};
const makeFakeCreate: CreateAccountRepository.Params = {
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password',
};
describe('CreateAccount Service', () => {
  it('Should call FindAccountByEmailRepository with correct value', async () => {
    const { sut, findAccountByEmailRepositoryStub } = makeSut();
    const findByEmailSpy = jest.spyOn(
      findAccountByEmailRepositoryStub,
      'findByEmail',
    );
    await sut.create(makeFakeCreate);
    expect(findByEmailSpy).toHaveBeenCalledWith(makeFakeCreate.email);
  });
});
