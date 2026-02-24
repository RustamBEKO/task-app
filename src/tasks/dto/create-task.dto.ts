import { IsString, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Status } from 'src/generated/prisma/enums';
import { DateTimeFieldRefInput } from 'src/generated/prisma/internal/prismaNamespace';

export class CreateTaskDto {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    // @Min(1888) // The year the first movie was made
    // @Max(new Date().getFullYear()) // Current year
    createdAt: Date;

    @IsEnum(Status)
    status: Status;

    @IsInt()
    userId: number;

    @IsInt()
    boardId: number;
}
