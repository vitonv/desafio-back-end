import bcrypt from 'bcrypt';

import { BcryptAdapter } from './BcryptAdapter';

jest.mock('bcrypt', () => ({
  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
  async hash(): Promise<string> {
    return Promise.resolve('hashed_value');
  },
}));
describe('Bcrypt Adapter', () => {
  describe('compare()', () => {
    it('Should call compare with correct values', async () => {
      const sut = new BcryptAdapter();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });
    it('Should return true when compare on succeeds', async () => {
      const sut = new BcryptAdapter();
      const isEqual = await sut.compare('any_value', 'any_hash');
      expect(isEqual).toBe(true);
    });
    it('Should return false when compare fails', async () => {
      const sut = new BcryptAdapter();
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.resolve(false));
      const isEqual = await sut.compare('any_value', 'any_hash');
      expect(isEqual).toBe(false);
    });
    it('Should throw if compare throws', async () => {
      const sut = new BcryptAdapter();
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.reject(new Error()));
      const error = sut.compare('any_value', 'any_hash');
      await expect(error).rejects.toThrow();
    });
  });

  describe('hash()', () => {
    it('Should call hash with correct values', async () => {
      const salt = 12;
      const sut = new BcryptAdapter();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });
    it('Should throw if hash throws', async () => {
      const sut = new BcryptAdapter();
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementationOnce(() => Promise.reject(new Error()));
      const error = sut.hash('any_value');
      await expect(error).rejects.toThrow();
    });
    it('Should return a hashed value on success', async () => {
      const sut = new BcryptAdapter();
      jest.spyOn(bcrypt, 'hash');
      const hashedValue = await sut.hash('any_value');
      expect(hashedValue).toEqual('hashed_value');
    });
  });
});
