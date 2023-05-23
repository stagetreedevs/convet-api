/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ObservationDto {
    @ApiProperty()
    planning: string;

    @ApiProperty()
    teacher: string;
    
    @ApiProperty()
    title: string;

    @ApiProperty()
    message: string;
  
}