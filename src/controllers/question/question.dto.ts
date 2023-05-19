/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
    @ApiProperty()
    user: string;

    @ApiProperty()
    school_subject_name: string;
    
    @ApiProperty()
    content: string;
  
    @ApiProperty()
    quantity: number;
  
    @ApiProperty()
    hits: number;
  
    @ApiProperty()
    comments: string;
}