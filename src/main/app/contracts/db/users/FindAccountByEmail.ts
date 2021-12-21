import { User } from '../../../../domain/entities/User';

export interface FindAccountByEmailRepository {
  findByEmail(
    email: FindAccountByEmailRepository.Params,
  ): Promise<FindAccountByEmailRepository.Response>;
}

export namespace FindAccountByEmailRepository {
  export type Params = string;
  export type Response = Omit<User, 'password'>;
}
