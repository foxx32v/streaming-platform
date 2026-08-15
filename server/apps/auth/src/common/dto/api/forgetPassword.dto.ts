import { IsEmpty } from "class-validator";
import { IsPassword } from "../../decorators/password.decorator";

export class ForgetPasswordDto {
    @IsPassword()
    "password": string;
    @IsEmpty()
    'email': string;
}