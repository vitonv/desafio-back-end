import { User } from '../../entities/User';

export interface CreateAccount {
  create(data: CreateAccount.Params): Promise<boolean>;
}

export namespace CreateAccount {
  export type Params = Omit<User, 'id'>;
}
