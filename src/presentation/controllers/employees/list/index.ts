import { ListEmployees } from '../../../../domain/useCases/employees/ListEmployees';
import { ok, serverError } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class ListEmployeesController implements Controller {
  constructor(private readonly listEmployees: ListEmployees) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const employees = await this.listEmployees.list();
      return ok(employees);
    } catch (error) {
      return serverError(error);
    }
  }
}
