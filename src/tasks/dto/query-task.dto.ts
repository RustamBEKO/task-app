
import { IsEnum, IsInt, IsIn, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from 'src/generated/prisma/enums'; 
import { ApiProperty } from '@nestjs/swagger';

export class QueryTaskDto {
  // --- PAGINATION ---
  @IsOptional()
  @Type(() => Number)   // converts query string "2" → number 2
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  // --- FILTERING ---

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
 description: string;

   @IsOptional()
    @ApiProperty({ example: 'TODO', description: 'Статус задачи' })
    @IsEnum(Status)
    status: Status;


  // --- SORTING ---
  @IsOptional()
  @IsIn(['title', 'description', 'Status'])
  sortBy?: 'title' | 'description'| 'Status';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}