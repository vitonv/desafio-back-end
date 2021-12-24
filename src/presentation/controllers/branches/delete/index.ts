import { DeleteBranch } from '../../../../domain/useCases/branches/DeleteBranch';
import { BranchDoesNotExists } from '../../../errors/BranchDoesNotExists';
import {
  badRequest,
  noContent,
  serverError,
} from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class DeleteBranchController implements Controller {
  constructor(private readonly deleteBranch: DeleteBranch) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const response = await this.deleteBranch.delete(id);
      if (!response) {
        return badRequest(new BranchDoesNotExists());
      }
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
