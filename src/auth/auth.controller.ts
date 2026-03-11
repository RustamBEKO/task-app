import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterRequest } from './dto/register.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterRequest) {
    return this.authService.register(dto);
  }
}
