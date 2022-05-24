import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { Result } from '../shared/Result';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ Email, Password }: LoginDto): Promise<Result> {
    const user = await this.validateUser(Email, Password);
    return Result.ok(this.tokenService.generateTokens(user));
  }

  async register(dto: CreateUserDto) {
    return Result.ok(await this.userService.create(dto));
  }

  async refreshToken(token: string): Promise<Result> {
    return Result.ok(await this.validateRefreshToken(token));
  }

  async validateRefreshToken(token: string): Promise<any> {
    try {
      const tokenDecoded = this.jwtService.decode(token) as any;

      await this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET,
        subject: tokenDecoded.sub,
      });
      const user = await this.userService.findOne(Number(tokenDecoded.sub));
      return this.tokenService.generateTokens(user);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async validateUser(email: string, pass: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);
      await this.userService.validatePassword(pass, user.Password);
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
