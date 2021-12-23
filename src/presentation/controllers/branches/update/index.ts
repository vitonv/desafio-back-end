import { UpdateBranch } from '../../../../domain/useCases/branches/UpdateBranch';
import {
  badRequest,
  noContent,
  ok,
  serverError,
} from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class UpdateBranchController implements Controller {
  constructor(private readonly updateBranch: UpdateBranch) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const { name } = httpRequest.body;
      const response = await this.updateBranch.update(id, name);
      if (!response) {
        return badRequest(new Error('This name already exists!'));
      }
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
