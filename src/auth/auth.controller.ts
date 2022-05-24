import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return result.toHttpResponse();
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    return result.toHttpResponse();
  }

  @Post('refresh-token')
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    const result = await this.authService.refreshToken(refreshToken);
    return result.toHttpResponse();
  }
}
