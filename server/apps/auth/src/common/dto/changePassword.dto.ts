import { IsPassword } from "../decorators/password.decorator";

export class ChangePasswordDto {
    @IsPassword()
    "oldPassword": string;
    @IsPassword()
    "newPassword": string;
}