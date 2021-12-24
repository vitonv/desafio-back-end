import jwt from 'jsonwebtoken';

import { JwtAdapter } from './JwtAdapter';

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret');
};
jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token');
  },
  async verify(): Promise<string> {
    return Promise.resolve('any_value');
  },
}));

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    it('Should call sign with correct values', async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });
    it('Should return a token on success', async () => {
      const sut = makeSut();
      const accessToken = await sut.encrypt('any_id');
      expect(accessToken).toBe('any_token');
    });
    it('Should throw if sign throws', async () => {
      const sut = makeSut();
      jest
        .spyOn(jwt, 'sign')
        .mockImplementationOnce(() => Promise.reject(new Error()));
      const error = sut.encrypt('any_id');
      await expect(error).rejects.toThrow();
    });
    describe('decrypt()', () => {
      it('Should call verify with correct values', async () => {
        const sut = makeSut();
        const verifySpy = jest.spyOn(jwt, 'verify');
        await sut.decrypt('any_token');
        expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
      });
      it('Should throw if verify throws', async () => {
        const sut = makeSut();
        jest
          .spyOn(jwt, 'verify')
          .mockImplementationOnce(() => Promise.reject(new Error()));
        const error = sut.decrypt('any_token');
        await expect(error).rejects.toThrow();
      });
      it('Should return a value on verify success', async () => {
        const sut = makeSut();
        const value = await sut.decrypt('any_token');
        expect(value).toBe('any_value');
      });
    });
  });
});
