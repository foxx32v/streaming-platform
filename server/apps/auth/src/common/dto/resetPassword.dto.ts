import { IsPassword } from "../decorators/password.decorator";

export class ResetPasswordDto {
    @IsPassword()
    "oldPassword": string;
    @IsPassword()
    "newPassword": string;
}