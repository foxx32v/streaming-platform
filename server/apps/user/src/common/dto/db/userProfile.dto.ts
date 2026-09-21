import { IsDate, IsEmail, IsNotEmpty, IsUUID } from "class-validator";
import { IsUserName } from "../../urils";

export class UserProfileDto {
    @IsUUID()
    'id': string
    @IsNotEmpty()
    @IsUserName()
    'userName': string
    'role': 'user' | 'admin'
    'avatarColor': string
    'isBlocked': boolean
    'status': string
    @IsDate()
    'lastSeenAt': Date
    @IsDate()
    'deletedAt': Date
    @IsDate()
    'createdAt': Date
    @IsDate()
    'updatedAt': Date
}