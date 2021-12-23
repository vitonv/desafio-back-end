import { ListBranches } from '../../../../domain/useCases/branches/ListBranches';
import { ok, serverError } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ListBranchesController implements Controller {
  constructor(private readonly listBranches: ListBranches) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, name } = httpRequest.query;
      const branches = await this.listBranches.list(id, name);
      return ok(branches);
    } catch (error) {
      return serverError(error);
    }
  }
}
