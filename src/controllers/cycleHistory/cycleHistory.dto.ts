/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class CycleHistoryDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    materias: [];
    
    @ApiProperty()
    replacement: Date;
}