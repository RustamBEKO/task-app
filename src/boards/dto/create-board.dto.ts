import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsInt, Min, Max } from 'class-validator';

export class CreateBoardDto {
    @ApiProperty({ example: 'Доска задач', description: 'Название доски' })
    @IsString()
    title: string;

}
