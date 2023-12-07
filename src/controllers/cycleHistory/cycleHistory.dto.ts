/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class CycleHistoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    user: string;

    @ApiProperty()
    materias: [];
    
    @ApiProperty()
    replacement: Date;
}