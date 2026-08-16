import { UUID } from "crypto";
import { db } from "../helper/db/db";
import { UserDto } from "../dto/db/user.dto";
import { ColorType, TokensType } from "../helper/types/helperTypes";
import { EmailDto, UserIdDto } from "../dto/api";

class UserRepository {
    async CreateUser(email: string, passwordHash: string, userName: string, linkActivate: string, avatarColor: ColorType) {
        await db.query(`
            INSERT INTO users
            (email, passwordHash, userName, linkActivate, avatarColor)
            VALUES($1,$2,$3,$4,$5)`,
        [email, passwordHash, userName, linkActivate, avatarColor]);
    }

    async ResetEmail(id: string, email: string) {
        await db.query(`
            UPDATE users
            SET email = $2
            WHERE id = $1`,
        [id, email])
    }

    async ResetPassword(id: string, passwordHash: string) {
        await db.query(`
            UPDATE users
            SET passwordHash = $2
            WHERE id = $1`,
        [id, passwordHash])
    }

    async GetUserById(id: string) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE id = $1`,
        [id])
        return user.rows[0] || null
    }

    async GetUserByEmail(email: string) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE email = $1`,
        [email])
        return user.rows[0]
    }

    async GetUserByUserName(userName: string) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE userName = $1`,
        [userName])
        return user.rows[0]
    }

    async ExistsByEmail(email: string) {
        const result = await db.query(`
            SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`,
        [email])
        return result.rows[0].exists
    }

    async ExistsByUserName(userName: string) {
        const result = await db.query(`
            SELECT EXISTS(SELECT 1 FROM users WHERE userName = $1)`,
        [userName])
        return result.rows[0].exists
    }

    async ChangeUserRole(id: string, role: string) {
        await db.query(`
            UPDATE users
            SET role = $2
            WHERE id = $1`,
        [id, role])
    }

    async ChangeBlockUser(id: string, isBlock: boolean) {
        await db.query(`
            UPDATE users
            SET isBlocked = $2
            WHERE id = $1`,
        [id, isBlock])
    }

    async GetTokens(id: string) {
        const tokens = await db.query(`
            SELECT refreshToken, accessToken
            FROM users
            WHERE id = $1`,
        [id])
        return tokens.rows[0]
    }

    async DeleteTokens(id: string) {
        await db.query(`
            UPDATE users
            SET refreshToken = NULL, accessToken = NULL
            WHERE id = $1`,
        [id]);
    }

    async UpdateTokens(id: string, tokens: TokensType) {
        await db.query(`
            UPDATE users
            SET refreshToken = $2, accessToken = $3
            WHERE id = $1`,
        [id, tokens.accessToken, tokens.refreshToken])
    }

    async UpdateLastSeen(id: string) {
        await db.query(`
            UPDATE users
            SET lastSeenAt = NOW()
            WHERE id = $1`,
        [id])
    }

    async GetAllUsers(page: number, limit: number) {
        const offset = (page - 1) * limit
        const users = await db.query(`
            SELECT id, email, userName, role, isBlocked, isActivate, lastSeenAt, createdAt
            FROM users
            ORDER BY createdAt DESC
            LIMIT $1 OFFSET $2`,
        [limit, offset])
        return users.rows
    }

    async CountUsers() {
        const result = await db.query(`
            SELECT COUNT(*) FROM users`)
        return parseInt(result.rows[0].count)
    }

    async DeleteUser(id: string) {
        await db.query(`
            DELETE FROM users
            WHERE id = $1`,
        [id])
    }

    async GetUserByRefreshToken(refreshToken: string) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE refreshToken = $1`,
        [refreshToken])
        return user.rows[0]
    }

    async UpdateRefreshToken(id: string, refreshToken: string) {
        await db.query(`
            UPDATE users
            SET refreshToken = $2
            WHERE id = $1`,
        [id, refreshToken])
    }

    async UpdateLinkActivate(id: string, linkActivation: string) {
        await db.query(`
            UPDATE users
            SET linkActivation = $2
            WHERE id = $1`,
        [id, linkActivation])
    }

    async UpdateResetTokens(id: string, resetToken: string) {
        await db.query(`
            UPDATE users
            SET resetToken = $2
            WHERE id = $1`,
        [id, resetToken])
    }

    async GetUserByResetToken(resetToken: string) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE resetToken = $1`,
        [resetToken])
        return user.rows[0]
    }

    async UpdateBlockReason(id: string, reason: string) {
        await db.query(`
            UPDATE users
            SET reason = $2
            WHERE id = $1`,
        [id, reason])
    }

    async CreateUserOAuth(email: string, passwordHash: string, userName: string, provider: string, avatar: string, avatarColor: ColorType) {
        const result = await db.query(`
            INSERT INTO users
            (email, passwordHash, userName, provider, avatar, avatarColor, isActivate)
            VALUES($1, $2, $3, $4, $5, $6, true)
            RETURNING id, email, userName, role, isActivate`,
        [email, passwordHash, userName, provider, avatar, avatarColor]);
        return result.rows[0];
    }
}

export default new UserRepository();