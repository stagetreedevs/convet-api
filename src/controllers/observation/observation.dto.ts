/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ObservationDto {
    @ApiProperty()
    cycle: string;

    @ApiProperty()
    user: string;
    
    @ApiProperty()
    title: string;

    @ApiProperty()
    message: string;
  
}