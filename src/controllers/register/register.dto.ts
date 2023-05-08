/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    type: string;
    
    @ApiProperty()
    school_subject_name: string;
    
    @ApiProperty()
    type_school_subject: string;
    
    @ApiProperty()
    stopwatch: Date;
    
    @ApiProperty()
    start_date: Date;
    
    @ApiProperty()
    start_time: Date;
    
    @ApiProperty()
    end_time: Date;
    
    @ApiProperty()
    duration: Date;
    
    @ApiProperty()
    notes: string;
    
    @ApiProperty()
    progress: number;
    
    @ApiProperty()
    pages_read: number;
    
    @ApiProperty()
    last_page: number;
    
    @ApiProperty()
    revision_number: number;
}