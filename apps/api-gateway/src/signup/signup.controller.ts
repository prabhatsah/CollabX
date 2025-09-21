import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { SignupService } from './signup.service';
import { CompleteSignupDto } from './dto/sign.dto';

@Controller('signup')
export class SignupController {
  private readonly logger = new Logger(SignupController.name);

  constructor(private readonly signupService: SignupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: CompleteSignupDto) {
    console.log('------------------------ Signup  called -----------------');

    return this.signupService.signup(dto);
  }
}
