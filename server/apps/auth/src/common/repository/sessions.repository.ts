import { db } from "../helper/db/db";
import { SessionIdDto, UserIdDto } from "../dto/api";
import { UUID } from "crypto";

export class SessionsRepository {
    async CreateSession(userId: string, refreshToken: string, userAgent: string, ip: string, expiresAt: Date) {
        await db.query(`
            INSERT INTO sessions
            (userId, refreshToken, userAgent, ip, expiresAt)
            VALUES($1, $2, $3, $4, $5)`,
        [userId, refreshToken, userAgent, ip, expiresAt])
    }

    async GetSessionById(sessionId: string) {
        const session = await db.query(`
            SELECT * FROM sessions
            WHERE id = $1 AND revokedAt IS NULL`,
        [sessionId])
        return session.rows[0]
    }

    async GetSessionByRefreshToken(refreshToken: string) {
        const session = await db.query(`
            SELECT * FROM sessions
            WHERE refreshToken = $1 AND revokedAt IS NULL`,
        [refreshToken])
        return session.rows[0]
    }

    async GetSessionsByUserId(userId: string) {
        const session = await db.query(`
            SELECT * FROM sessions
            WHERE userId = $1 AND revokedAt IS NULL`,
        [userId])
        return session.rows
    }

    async RevokeSession(sessionId: string) {
        await db.query(`
            UPDATE sessions
            SET revokedAt = NOW()
            WHERE id = $1`,
        [sessionId])
    }

    async RevokeAllSessions(userId: string) {
        await db.query(`
            UPDATE sessions
            SET revokedAt = NOW()
            WHERE userId = $1 AND revokedAt IS NULL`,
        [userId])
    }

    async DeleteExpiredSessions() {
        await db.query(`
            DELETE FROM sessions
            WHERE expiresAt < NOW()`)
    }
}

export default new SessionsRepository();