import { IsDateString, IsEmail, IsNotEmpty } from "class-validator";
import { IsPassword, IsUserName } from "../../decorators";

export class RegisterDto {
    @IsNotEmpty()
    @IsUserName()
    'userName': string;
    @IsEmail()
    @IsNotEmpty()
    'email': string;
    @IsDateString()
    'birthDate': string;
    @IsPassword()
    'password': string;
    @IsPassword()
    'doublePassword': string;
}