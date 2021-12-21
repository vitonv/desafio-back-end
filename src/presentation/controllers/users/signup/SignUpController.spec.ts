import faker from 'faker';

import { SignUpController } from '.';
import { CreateAccount } from '../../../../domain/useCases/user/CreateAccount';
import { EmailAlreadyExists } from '../../../errors/EmailAlreadyExists';
import {
  badRequest,
  created,
  serverError,
} from '../../../helpers/http/HttpHelper';

const makeCreateAccount = () => {
  class CreateAccountSpy implements CreateAccount {
    async create(data: CreateAccount.Params): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new CreateAccountSpy();
};

const makeSut = () => {
  const createAccountSpy = makeCreateAccount();
  const sut = new SignUpController(createAccountSpy);
  return {
    sut,
    createAccountSpy,
  };
};

const makeFakeRequest = {
  body: {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
};
describe('SignUp Controller', () => {
  it('should call createAccount with correct values', async () => {
    const { sut, createAccountSpy } = makeSut();
    const createSpy = jest.spyOn(createAccountSpy, 'create');
    await sut.handle(makeFakeRequest);
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest.body);
  });
  it('should return 400 if createAccount returns false', async () => {
    const { sut, createAccountSpy } = makeSut();
    const createSpy = jest
      .spyOn(createAccountSpy, 'create')
      .mockReturnValueOnce(Promise.resolve(false));
    const httpResponse = await sut.handle(makeFakeRequest);
    expect(httpResponse).toEqual(badRequest(new EmailAlreadyExists()));
  });
  it('should return 500 if createAccount throws', async () => {
    const { sut, createAccountSpy } = makeSut();
    const createSpy = jest
      .spyOn(createAccountSpy, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });
  it('should return 201 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest);
    expect(httpResponse.statusCode).toEqual(201);
    expect(httpResponse.body).toEqual(true);
  });
});
