import { HttpRequest, HttpResponse } from './Http';

interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export { Controller };
