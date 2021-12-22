import jwt from 'jsonwebtoken';

import { Decrypter } from '../../../app/contracts/cryptography/Decrypter';
import { Encrypter } from '../../../app/contracts/cryptography/Encrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}
  async decrypt(text: string): Promise<string> {
    return jwt.verify(text, this.secret) as any;
  }
  async encrypt(id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret);
    return accessToken;
  }
}
