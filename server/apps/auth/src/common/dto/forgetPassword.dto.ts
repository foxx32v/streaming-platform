import { IsPassword } from "../decorators/password.decorator";

export class ForgetPasswordDto {
    @IsPassword()
    "password": string;
}