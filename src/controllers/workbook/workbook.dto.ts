/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class WorkbookDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    materia: string;

    @ApiProperty()
    pages: string;

}