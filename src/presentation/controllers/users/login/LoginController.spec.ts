import { AuthenticationController } from '.';
import { Authentication } from '../../../../domain/useCases/user/Login';

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
});
