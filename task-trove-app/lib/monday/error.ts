import { MondayErrorSchema } from './schema';
import type { Errors } from './types';

export class MondayAPIError extends Error {
  accountId?: number;
  errorCode?: string;
  statusCode?: number;
  errorMessage?: string;
  errorData?: Record<string, unknown>;
  errors?: Errors;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(response: any) {
    super('An error occurred with the Monday API');
    Object.setPrototypeOf(this, MondayAPIError.prototype);

    const parsed = MondayErrorSchema.safeParse(response);

    if (!parsed.success) {
      console.log('validation errors', parsed.error);
      this.message = 'Unknown error occurred';
      return;
    }

    const errorData = parsed.data;

    if ('account_id' in errorData) this.accountId = errorData.account_id;
    if ('errorCode' in errorData) {
      this.errorCode = errorData.errorCode;
      this.statusCode = errorData.statusCode;
      this.errorMessage = errorData.errorMessage;
      this.errorData = errorData.errorData;
      this.message = this.errorMessage;
    } else if ('error_message' in errorData) {
      this.errorMessage = errorData.error_message;
      this.statusCode = errorData.status_code;
      this.message = this.errorMessage;
    } else if ('errors' in errorData) {
      this.errors = errorData.errors;
      this.message = this.errors.map(error => error.message).join('; ');
    }

    this.name = 'MondayAPIError';
  }
}
