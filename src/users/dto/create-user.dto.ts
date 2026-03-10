import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";


export class CreateUserDto {
    @ApiProperty({ example: 'Иван Иванов', description: 'Имя пользователя' })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({ example: 'ivanov@example.com', description: 'Email пользователя' })
    @IsEmail()
    email: string;


}