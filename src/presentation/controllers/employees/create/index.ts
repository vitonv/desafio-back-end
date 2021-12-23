import { CreateEmployee } from '../../../../domain/useCases/employees/CreateEmployee';
import { badRequest, created } from '../../../helpers/http/HttpHelper';
import { Controller, HttpRequest, HttpResponse } from '../../../protocols';

export class CreateEmployeeController implements Controller {
  constructor(private readonly createEmployee: CreateEmployee) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, branch_name } = httpRequest.body;
    const response = await this.createEmployee.create({
      name,
      branch_name,
    });
    if (response) {
      return created(true);
    }
    return badRequest(new Error('Branch does not exists!'));
  }
}
