import { IsDateString, IsEmail, IsNotEmpty } from "class-validator";
import { IsPassword } from "../decorators/password.decorator";
import { IsUserName } from "../decorators/userName.decorator";

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    'email': string;
    @IsUserName()
    'userName': string;
    @IsDateString()
    'birthDate': string;
    @IsPassword()
    'password': string;
    @IsPassword()
    'doublePassword': string;
}