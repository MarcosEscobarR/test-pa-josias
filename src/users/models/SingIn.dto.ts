import {ApiProperty} from "@nestjs/swagger";

export class SingInDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}