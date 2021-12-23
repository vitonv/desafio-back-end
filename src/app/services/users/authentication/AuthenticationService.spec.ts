import { AuthenticationService } from '.';
import { Encrypter } from '../../../contracts/cryptography/Encrypter';
import { HashComparer } from '../../../contracts/cryptography/HashComparer';
import { UpdateAccessTokenRepository } from '../../../contracts/db/users/CreateAccessToken';
import { FindAccountByEmailRepository } from '../../../contracts/db/users/FindAccountByEmail';

const makeFindAccountByEmailRepository = () => {
  class FindAccountByEmailRepositorySpy
    implements FindAccountByEmailRepository
  {
    async findByEmail(
      email: string,
    ): Promise<FindAccountByEmailRepository.Response> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'hashed_password',
      });
    }
  }
  return new FindAccountByEmailRepositorySpy();
};

const makeHashComparer = () => {
  class HashComparerSpy implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashComparerSpy();
};

const makeEncrypter = () => {
  class EncrypterSpy implements Encrypter {
    async encrypt(id: string): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new EncrypterSpy();
};

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
    async update(id: string, token: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdateAccessTokenRepositorySpy();
};

const makeSut = () => {
  const findAccountByEmailRepositorySpy = makeFindAccountByEmailRepository();
  const hashComparerSpy = makeHashComparer();
  const encrypterSpy = makeEncrypter();
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository();
  const sut = new AuthenticationService(
    findAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy,
  );
  return {
    sut,
    findAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy,
  };
};
const makeAuth = {
  email: 'any_mail@mail.com',
  password: 'any_password',
};
describe('Authentication Service', () => {
  it('Should call findAccountByEmailRepository with correct value ', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    const findByEmailSpy = jest.spyOn(
      findAccountByEmailRepositorySpy,
      'findByEmail',
    );
    await sut.auth(makeAuth);
    expect(findByEmailSpy).toHaveBeenCalledWith(makeAuth.email);
  });
  it('Should throw if findAccountByEmailRepository throws ', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(findAccountByEmailRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.auth(makeAuth);
    await expect(error).rejects.toThrow();
  });
  it('Should return null if findAccountByEmailRepository returns falsy ', async () => {
    const { sut, findAccountByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(findAccountByEmailRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(undefined));
    const response = await sut.auth(makeAuth);
    expect(response).toBe(null);
  });
  it('Should call hashComparer with correct values ', async () => {
    const { sut, hashComparerSpy } = makeSut();
    const compareSpy = jest.spyOn(hashComparerSpy, 'compare');
    await sut.auth(makeAuth);
    expect(compareSpy).toHaveBeenCalledWith(
      makeAuth.password,
      'hashed_password',
    );
  });
  it('Should call hashComparer with correct values ', async () => {
    const { sut, hashComparerSpy } = makeSut();
    const compareSpy = jest
      .spyOn(hashComparerSpy, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));
    const response = await sut.auth(makeAuth);
    expect(response).toBe(null);
  });
  it('Should throw if hashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut();
    const compareSpy = jest
      .spyOn(hashComparerSpy, 'compare')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.auth(makeAuth);
    expect(error).rejects.toThrow();
  });
  it('Should call encrypter with correct value ', async () => {
    const { sut, encrypterSpy } = makeSut();
    const encryptSpy = jest.spyOn(encrypterSpy, 'encrypt');
    await sut.auth(makeAuth);
    expect(encryptSpy).toHaveBeenCalledWith('any_id');
  });
  it('Should throw if Encrypter throws ', async () => {
    const { sut, encrypterSpy } = makeSut();
    jest
      .spyOn(encrypterSpy, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.auth(makeAuth);
    expect(error).rejects.toThrow();
  });
  it('Should call UpdateAccessTokenRepository with correct values ', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut();
    const updateSpy = jest.spyOn(updateAccessTokenRepositorySpy, 'update');
    await sut.auth(makeAuth);
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });
  it('Should throw if UpdateAccessTokenRepository throws ', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositorySpy, 'update')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.auth(makeAuth);
    expect(error).rejects.toThrow();
  });
});
