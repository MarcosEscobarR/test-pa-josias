import { HttpException } from '@nestjs/common';

export class Result {
  isSuccess: boolean;
  errors: string[];
  data: unknown;
  constructor(isSuccess: boolean, errors: string[], data?: unknown) {
    this.isSuccess = isSuccess;
    this.errors = errors;
    this.data = data;
  }

  static ok = (data?: unknown): Result => new Result(true, null, data);
  static notFound = (): Result => new Result(false, ['No Encontrado']);
  static ofErrors = (errors: string[]): Result => new Result(false, errors);
  static ofError = (error: string): Result => new Result(false, [error]);

  toCreatedHttpResponse = () => {
    return this.isSuccess
      ? { statusCode: 201 }
      : new HttpException(
          { status: 500, body: this.errors as any } as Response,
          500,
        );
  };

  toHttpResponse = () => {
    return this.isSuccess
      ? this.data
        ? this.data
        : { statusCode: 200 }
      : new HttpException(
          { status: 500, body: this.errors as any } as Response,
          500,
        );
  };
}
