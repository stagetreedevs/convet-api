/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class AdminDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}