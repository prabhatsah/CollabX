import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from "@nestjs/common";
import { ApiResponseDto } from "../dto/response.dto";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const error =
      typeof exceptionResponse === "string"
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    this.logger.error(
      `HTTP Status: ${status} Error Message: ${JSON.stringify(error)}`,
      exception.stack,
      `${request.method} ${request.url}`
    );

    const errorResponse = ApiResponseDto.error(
      error["message"] || "Internal server error",
      error["errors"] || [error]
    );

    response.status(status).json(errorResponse);
  }
}
