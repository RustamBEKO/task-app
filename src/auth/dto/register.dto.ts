import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterRequest {
    @ApiProperty({ example: 'ivanov@example.com', description: 'Email пользователя' })
@IsString()
@IsEmail()
@IsNotEmpty()
email: string;
@ApiProperty({ example: 'Ivan Ivanov', description: 'Имя пользователя' })
@IsString()
@IsNotEmpty()
@MinLength(2)
@MaxLength(50)
name: string;

@ApiProperty({ example: 'secret123', description: 'Пароль пользователя' })
@IsString()
@IsNotEmpty()
@MinLength(6)
@MaxLength(50)
password: string;
}