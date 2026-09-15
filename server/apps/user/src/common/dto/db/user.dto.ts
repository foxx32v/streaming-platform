import { IsDate, IsEmail, IsNotEmpty, IsUUID } from "class-validator";
import { IsUserName } from "../../urils";

export class UserDto {
    @IsUUID()
    'id': string
    @IsEmail()
    @IsNotEmpty()
    'email': string
    @IsNotEmpty()
    @IsUserName()
    'userName': string
    'role': string
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