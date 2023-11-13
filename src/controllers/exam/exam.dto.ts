/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ExamDto {
    @ApiProperty()
    contest_code: string;

    @ApiProperty()
    exam_number: number;

    @ApiProperty()
    subjects: object[];
}