import { IsEmail, isNotEmpty, IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "crypto";
import { ColorType } from "../../helper/types/helperTypes";
import { IsPassword, IsUserName } from "../../decorators/";

export class UserDto {
    'id': UUID
    @IsEmail()
    @IsNotEmpty()
    'email': string
    @IsPassword()
    'password': string
    @IsNotEmpty()
    @IsUserName()
    'userName': string
    'refreshToken': string
    'accessToken': string
    'role': string
    'avatarColor': ColorType
    'isActivate': boolean
    'isBlocked': boolean
    'status': string
    'linkActivate': string
    'lastSeenAt': Date
    'deletedAt': Date
    'createdAt': Date
    'updatedAt': Date
    'subscriptionExpiresAt': Date
    'subscriptionTier': string
    'isPremium': boolean
    'stripeCustomerId': string
    'reason': string
}