/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class CycleDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    materias: [];
    
}