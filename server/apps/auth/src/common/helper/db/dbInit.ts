// server/apps/auth/src/common/helper/db/dbInit.ts
import { db } from './db';

export const DbInit = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) UNIQUE NOT NULL,
            passwordHash VARCHAR(255) NOT NULL,
            userName VARCHAR(50) UNIQUE NOT NULL,
            refreshToken VARCHAR(500),
            accessToken VARCHAR(500),
            role VARCHAR(50) DEFAULT 'user',
            avatarColor VARCHAR(7) DEFAULT '#000000',
            isActivate BOOLEAN DEFAULT false,
            isBlocked BOOLEAN DEFAULT false,
            status VARCHAR(50) DEFAULT 'active',
            linkActivate VARCHAR(255),
            lastSeenAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            subscriptionExpiresAt TIMESTAMP,
            subscriptionTier VARCHAR(50) DEFAULT 'free',
            isPremium BOOLEAN DEFAULT false,
            stripeCustomerId VARCHAR(255),
            resetToken TEXT,
            reason TEXT,
            provider TEXT,
            avatar TEXT
        );

        CREATE TABLE IF NOT EXISTS sessions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            refreshToken TEXT NOT NULL,
            userAgent TEXT,
            ip VARCHAR(45),
            expiresAt TIMESTAMP NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            revokedAt TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_sessions_userId ON sessions(userId);
        CREATE INDEX IF NOT EXISTS idx_sessions_refreshToken ON sessions(refreshToken);
    `);
};