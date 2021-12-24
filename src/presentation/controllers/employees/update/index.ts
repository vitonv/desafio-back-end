import { UpdateEmployee } from '../../../../domain/useCases/employees/UpdateEmployee';
import { BranchDoesNotExists } from '../../../errors/BranchDoesNotExists';
import {
  badRequest,
  noContent,
  serverError,
} from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class UpdateEmployeeController implements Controller {
  constructor(private readonly updateEmployee: UpdateEmployee) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const { name, branch_name } = httpRequest.body;
      const response = await this.updateEmployee.update({
        id,
        name,
        branch_name,
      });
      if (response) {
        return noContent();
      }
      return badRequest(new BranchDoesNotExists());
    } catch (error) {
      return serverError(error);
    }
  }
}
