import { IsEmail, isNotEmpty, IsNotEmpty, IsUUID } from "class-validator";
import { IsPassword, IsUserName } from "../../decorators/";

export class UserDto {
    'id': string
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
    'avatarjColor': string
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