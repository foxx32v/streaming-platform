import { UUID } from "crypto";
import { SessionIdDto, UserIdDto } from "../api";

export class SessionDto {
    'id': SessionIdDto;
    'userId': UserIdDto;
    'refreshToken': string;
    'userAgent': string;
    'ip': string;
    'expiresAt': Date;
    'createdAt': Date;
    'revokedAt': Date | null;
}