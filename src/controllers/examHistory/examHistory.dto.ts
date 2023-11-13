/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class ExamHistoryDto {
    @ApiProperty()
    user_id: string;

    @ApiProperty()
    exam_id: string;

    @ApiProperty()
    contest_code: string;

    @ApiProperty()
    exam_number: number;

    @ApiProperty()
    subjects: object[];
}