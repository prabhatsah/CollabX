export class ApiResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];

  constructor(success: boolean, message: string, data?: T, errors?: any[]) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  static success<T>(
    data: T,
    message = 'Operation successful',
  ): ApiResponseDto<T> {
    return new ApiResponseDto(true, message, data);
  }

  static error(message: string, errors?: any[]): ApiResponseDto<null> {
    return new ApiResponseDto(false, message, null, errors);
  }
}
