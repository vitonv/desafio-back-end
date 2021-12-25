import { ListBranchEmployees } from '../../../../domain/useCases/branches/ListBranchEmployees';
import { ok, serverError } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ListBranchEmployeesController implements Controller {
  constructor(private readonly listBranchEmployees: ListBranchEmployees) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const { name } = httpRequest.query;
      const employees = await this.listBranchEmployees.listEmployees(id, name);
      return ok(employees);
    } catch (error) {
      return serverError(error);
    }
  }
}
