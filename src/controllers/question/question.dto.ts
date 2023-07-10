/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class QuestionDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    cycle: string;

    @ApiProperty()
    school_subject_name: string;
    
    @ApiProperty()
    school_subject_code: string;
    
    @ApiProperty()
    content: string;
  
    @ApiProperty()
    quantity: number;
  
    @ApiProperty()
    hits: number;

    @ApiProperty()
    mistakes: number;
  
    @ApiProperty()
    comments: string;

    @ApiProperty()
    created_date: Date;
}