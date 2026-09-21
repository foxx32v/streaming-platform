import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
    @IsOptional()
    @IsBoolean()
    'showPhone'?: boolean;
    @IsOptional()
    @IsBoolean()
    'showEmail'?: boolean;
    @IsOptional()
    @IsBoolean()
    'privateProfile'?: boolean;
}