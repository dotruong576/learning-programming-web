import { EHttpStatus } from './statusCode';

class AppError extends Error {
  statusCode: EHttpStatus;

  constructor(statusCode: EHttpStatus, message: string) {
    super();

    this.statusCode = statusCode;
    this.message = message;
  }
}

export default AppError;
