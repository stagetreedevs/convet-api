/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class SchoolSubjectDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;
}