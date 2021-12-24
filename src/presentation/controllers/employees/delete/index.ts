import { DeleteEmployee } from '../../../../domain/useCases/employees/DeleteEmployee';
import { noContent, serverError } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class DeleteEmployeeController implements Controller {
  constructor(private readonly deleteEmployee: DeleteEmployee) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      await this.deleteEmployee.delete(id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
