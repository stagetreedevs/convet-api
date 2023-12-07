/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class CycleDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    user: string;

    @ApiProperty()
    materias: [];

}

export class CycleNameDto {
    @ApiProperty()
    name: string;
}