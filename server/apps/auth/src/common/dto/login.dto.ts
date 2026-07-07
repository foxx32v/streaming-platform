import { IsEmail } from "class-validator";
import { IsPassword } from "../decorators/password.decorator";

export class LoginDto {
    @IsEmail()
    'email': string;
    @IsPassword()
    'password': string;
    @IsPassword()
    'doublePassword': string;
}