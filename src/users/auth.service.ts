import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './models/JwtPayload';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UsersService,
    private JwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    try {
      const user = await this.UserService.findByEmail(email);
      await user.validatePassword(pass);
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async generateAccessToken(email: string) {
    const user = await this.UserService.findByEmail(email);
    return this.generateTokens(user);
  }

  async validateRefreshToken(token: string): Promise<any> {
    try {
      const tokenDecoded = this.JwtService.decode(token) as any;

      await this.JwtService.verify(token, {
        secret: process.env.REFRESH_SECRET,
        subject: tokenDecoded.sub,
      });
      const user = await this.UserService.findOne(Number(tokenDecoded.sub));
      return this.generateTokens(user);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  private generateTokens(user: User) {
    const payload: JwtPayload = {
      role: user.Role.toString(),
    };

    return {
      access_token: this.JwtService.sign(payload, {
        privateKey: process.env.ACCESS_SECRET,
        subject: user.Id.toString(),
        expiresIn: '5m',
      }),
      refresh_token: this.JwtService.sign(
        {},
        {
          secret: process.env.REFRESH_SECRET,
          expiresIn: '30d',
          subject: user.Id.toString(),
        },
      ),
    };
  }
}
