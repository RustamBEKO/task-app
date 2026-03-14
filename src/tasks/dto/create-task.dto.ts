import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Status } from 'src/generated/prisma/enums';
import { DateTimeFieldRefInput } from 'src/generated/prisma/internal/prismaNamespace';

export class CreateTaskDto {
    
    @ApiProperty({ example: 'Сделать домашнее задание', description: 'Название задачи' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Описание задачи', description: 'Описание задачи' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'TODO', description: 'Статус задачи' })
    @IsEnum(Status)
    status: Status;

    @ApiProperty({ example: 1, description: 'ID доски' })
    @IsInt()
    boardId: number;
}
