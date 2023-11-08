import { CustomHttpErrorResponse } from './custom-http-error-response.interface';

export interface DatabaseError extends CustomHttpErrorResponse {
  details: {
    code: string;
    detail: string;
  };
}
