import { Controller, Post, Body, UseGuards, Request, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

class RegisterDto {
  login: string;
  password: string;
}

class LoginDto {
  login: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.login, dto.password);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.login, dto.password);
  }

  @Get('validate')
  async validate(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.authService.validateToken(token);
  }
} 