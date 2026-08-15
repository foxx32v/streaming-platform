import { IsPassword } from "../../decorators";

export class ResetPasswordDto {
    @IsPassword()
    "newPassword": string;
    @IsPassword()
    "doublePassword": string;
    'resetToken': string;
}