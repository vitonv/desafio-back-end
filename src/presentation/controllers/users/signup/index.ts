import { CreateAccount } from '../../../../domain/useCases/user/CreateAccount';
import { EmailAlreadyExists } from '../../../errors/EmailAlreadyExists';
import {
  badRequest,
  created,
  serverError,
} from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class SignUpController implements Controller {
  constructor(private readonly createAccount: CreateAccount) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const isCreated = await this.createAccount.create(httpRequest.body);
      if (!isCreated) {
        return badRequest(new EmailAlreadyExists());
      }
      return created(isCreated);
    } catch (error) {
      return serverError(error);
    }
  }
}
