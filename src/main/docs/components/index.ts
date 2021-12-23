import { apiKeyAuthSchema } from '../schemas/apiAuthSchema';
import { badRequest } from './badRequest';
import { created } from './created';
import { forbidden } from './forbidden';
import { noContent } from './noContent';
import { notFound } from './notFound';
import { serverError } from './serverError';
import { unauthorized } from './unauthorized';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  created,
  forbidden,
  noContent,
  notFound,
  serverError,
  unauthorized,
};
