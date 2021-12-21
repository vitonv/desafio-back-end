import { User } from '../../../../domain/entities/User';

export interface CreateAccountRepository {
  create(data: CreateAccountRepository.Params): Promise<void>;
}

export namespace CreateAccountRepository {
  export type Params = Omit<User, 'id'>;
}
