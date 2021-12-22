import { hash, compare } from 'bcrypt';

import { HashComparer } from '../../../app/contracts/cryptography/HashComparer';
import { Hasher } from '../../../app/contracts/cryptography/Hasher';

export class BcryptAdapter implements Hasher, HashComparer {
  async hash(value: string): Promise<string> {
    return hash(value, 12);
  }
  async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
