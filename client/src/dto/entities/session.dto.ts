export interface sessionDto {
    id: string;
    userId: string;
    refreshToken: string;
    userAgent: string;
    ip: string;
    expiresAt: Date;
    createdAt: Date;
    revokedAt: Date | null;
}