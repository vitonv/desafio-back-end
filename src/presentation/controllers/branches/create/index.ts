import { CreateBranch } from '../../../../domain/useCases/branches/CreateBranch';
import { created, serverError } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class CreateBranchController implements Controller {
  constructor(private readonly createBranch: CreateBranch) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name } = httpRequest.body;
      await this.createBranch.create(name);
      return created(true);
    } catch (error) {
      return serverError(error);
    }
  }
}
