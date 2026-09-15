import { IsDate, IsUUID } from "class-validator";

export class SubscriptionsDto {
    @IsUUID()
    'id': string;
    @IsUUID()
    'followerId': string;
    @IsUUID()
    'followingId': string;
    @IsDate()
    'createdAt': Date;
    @IsDate()
    'updatedAt': Date;
    @IsDate()
    'deletedAt': Date;
}