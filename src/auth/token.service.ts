import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../users/models/JwtPayload';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private JwtService: JwtService) {}

  generateTokens(user: User){
    const payload: JwtPayload = {
      userName: user.Name,
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
