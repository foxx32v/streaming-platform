import { IsOptional } from "class-validator";
import { IsUserName, IsUserStatus } from "../../urils";

export class UpdateUserProfileDto {
    @IsOptional()
    @IsUserName()
    'userName'?: string;
    @IsOptional()
    @IsUserStatus()
    'status'?: string;
}