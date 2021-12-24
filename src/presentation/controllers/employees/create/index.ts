import { CreateEmployee } from '../../../../domain/useCases/employees/CreateEmployee';
import { BranchDoesNotExists } from '../../../errors/BranchDoesNotExists';
import {
  badRequest,
  created,
  serverError,
} from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class CreateEmployeeController implements Controller {
  constructor(private readonly createEmployee: CreateEmployee) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, branch_name } = httpRequest.body;
      const response = await this.createEmployee.create({
        name,
        branch_name,
      });
      if (response) {
        return created(true);
      }
      return badRequest(new BranchDoesNotExists());
    } catch (error) {
      return serverError(error);
    }
  }
}
