import { ApiResponseDto } from '@app/common/dto/response.dto';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class GrpcToHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrpcToHttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any[] = [];

    // Case 1: Standard Nest HttpException bubbled through gRPC
    if (exception?.status && exception?.message) {
      status = exception.status;
      message = exception.message;
    }
    // Case 2: gRPC-style error
    else if (exception?.code && exception?.details) {
      // Map gRPC codes → HTTP
      switch (exception.code) {
        case 6: // ALREADY_EXISTS
          status = HttpStatus.CONFLICT;
          break;
        case 5: // NOT_FOUND
          status = HttpStatus.NOT_FOUND;
          break;
        case 3: // INVALID_ARGUMENT
          status = HttpStatus.BAD_REQUEST;
          break;
        case 7: // PERMISSION_DENIED
          status = HttpStatus.FORBIDDEN;
          break;
        case 16: // UNAUTHENTICATED
          status = HttpStatus.UNAUTHORIZED;
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      message = exception.details || message;
      errors = [
        {
          code: exception.code,
          details: exception.details,
        },
      ];
    }

    response.status(status).json(ApiResponseDto.error(message, errors));
  }
}
