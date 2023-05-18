/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class PlanningCycleDto {
    @ApiProperty()
    school_subject_code: string;
    
    @ApiProperty()
    school_subject_name: string;
    
    @ApiProperty()
    progress: string;

    @ApiProperty()
    total_pages: string;

    @ApiProperty()
    pages_read: string;

    @ApiProperty()
    current_page: string;

    @ApiProperty()
    last_page: string;

    @ApiProperty()
    revision_number: string;

    @ApiProperty()
    questions: string;

    @ApiProperty()
    questions_hits: string;

    @ApiProperty()
    study_time: Date;

}