/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class QuestionRegDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    cycle: string;
    
    @ApiProperty()
    school_subject_name: string;
    
    @ApiProperty()
    school_subject_code: string;
    
    @ApiProperty()
    qtd_questions: string;
    
    @ApiProperty()
    questions_hits: string;
    
    @ApiProperty()
    notes: string;
}