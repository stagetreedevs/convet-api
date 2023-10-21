/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
    @ApiProperty()
    type: string;

    @ApiProperty()
    user: string;

    @ApiProperty()
    cycle: string;
    
    @ApiProperty()
    school_subject_name: string;

    @ApiProperty()
    school_subject_code: string;
    
    @ApiProperty()
    type_school_subject: string;
    
    @ApiProperty()
    workbook: string;
    
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
    last_page_read: string;
    
    @ApiProperty()
    last_page: number;
    
    @ApiProperty()
    revision_number: number;

    @ApiProperty()
    videos_watched: number;

    @ApiProperty()
    qtd_questions: number;
    
    @ApiProperty()
    questions_hits: number;

    @ApiProperty()
    duration_cycle_card: string;

    @ApiProperty()
    id_cycle_card: string;
}