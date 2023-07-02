/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class CycleModelDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    materias: [];
    
}