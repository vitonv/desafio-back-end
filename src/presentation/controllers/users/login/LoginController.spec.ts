import { AuthenticationController } from '.';
import { Authentication } from '../../../../domain/useCases/user/Login';
import { InvalidCredentials } from '../../../errors';
import { badRequest } from '../../../helpers/http/HttpHelper';

const makeAuthentication = () => {
  class AuthenticationSpy implements Authentication {
    async auth(
      credentials: Authentication.Params,
    ): Promise<Authentication.Result> {
      return {
        name: 'any_name',
        accessToken: 'any_token',
      };
    }
  }
  return new AuthenticationSpy();
};
const makeSut = () => {
  const authenticationSpy = makeAuthentication();
  const sut = new AuthenticationController(authenticationSpy);
  return {
    sut,
    authenticationSpy,
  };
};
const makeFakeRequest = () => ({
  body: {
    email: 'any_mail@mail.com',
    password: 'any_password',
  },
});
describe('Authentication Controller', () => {
  it('Should call authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const authSpy = jest.spyOn(authenticationSpy, 'auth');
    await sut.handle(makeFakeRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      password: 'any_password',
    });
  });
  it('Should return 400 if authentication returns falsy', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.resolve(null));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new InvalidCredentials()));
  });
  it('Should return 500 if authenticationthrows', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const response = await sut.handle(makeFakeRequest());
    expect(response.statusCode).toBe(500);
  });
  it('Should return 200 on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(makeFakeRequest());
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy();
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('name');
  });
});
