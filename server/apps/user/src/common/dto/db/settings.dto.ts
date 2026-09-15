import { IsDate, IsUUID } from "class-validator";

export class SettingsDto {
    @IsUUID()
    'id': string;
    @IsUUID()
    'userId': string;
    'privateProfile': boolean;
    'showPhone': boolean;
    'showEmail': boolean;
    @IsDate()
    'createdAt': Date;
    @IsDate()
    'updatedAt': Date;
}