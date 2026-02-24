import { IsString, IsEnum, IsInt, Min, Max } from 'class-validator';

export class CreateBoardDto {

    @IsInt()
    id: number;
    
    @IsString()
    title: string;

    @IsInt()
    @Min(1888) // The year the first movie was made
    @Max(new Date().getFullYear()) // Current year
    createdAt: Date;


}
