/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class PlanningDto {
    @ApiProperty()
    school_subject_code: string;

    @ApiProperty()
    school_subject_name: string;

    @ApiProperty()
    qtd_hours: string;

    @ApiProperty()
    qtd_videos: Date;

    @ApiProperty()
    total_pg: Date;
}