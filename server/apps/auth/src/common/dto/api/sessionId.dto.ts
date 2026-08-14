import { IsUUID } from 'class-validator';

export class SessionIdDto {
    @IsUUID()
    'sessionId': string
}