import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  Email: string;
  @ApiProperty()
  Password: string;
}
