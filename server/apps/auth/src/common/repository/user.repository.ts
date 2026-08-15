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

    async ResetEmail(id: UserIdDto, email: string) {
        await db.query(`
            UPDATE users
            SET email = $2
            WHERE id = $1`,
        [id, email])
    }

    async ResetPassword(id: UserIdDto, hashPassword: string) {
        await db.query(`
            UPDATE users
            SET password = $2
            WHERE id = $1`,
        [id, hashPassword])
    }

    async GetUserById(id: UserIdDto) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE id = $1`,
        [id])
        return user.rows[0]
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

    async ChangeUserRole(id: UserIdDto, role: string) {
        await db.query(`
            UPDATE users
            SET role = $2
            WHERE id = $1`,
        [id, role])
    }

    async ChangeBlockUser(id: UserIdDto, isBlock: boolean) {
        await db.query(`
            UPDATE users
            SET isBlocked = $2
            WHERE id = $1`,
        [id, isBlock])
    }

    async GetTokens(id: UserIdDto) {
        const tokens = await db.query(`
            SELECT refreshToken, accessToken
            FROM users
            WHERE id = $1`,
        [id])
        return tokens.rows[0]
    }

    async DeleteTokens(id: UserIdDto) {
        await db.query(`
            UPDATE users
            SET refreshToken = NULL, accessToken = NULL
            WHERE id = $1`,
        [id]);
    }

    async UpdateTokens(id: UserIdDto, tokens: TokensType) {
        await db.query(`
            UPDATE users
            SET refreshToken = $2, accessToken = $3
            WHERE id = $1`,
        [id, tokens.accessToken, tokens.refreshToken])
    }

    async UpdateLastSeen(id: UserIdDto) {
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

    async DeleteUser(id: UserIdDto) {
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

    async UpdateRefreshToken(id: UserIdDto, refreshToken: string) {
        await db.query(`
            UPDATE users
            SET refreshToken = $2
            WHERE id = $1`,
        [id, refreshToken])
    }

    async UpdateLinkActivate(id: UserIdDto, linkActivation: string) {
        await db.query(`
            UPDATE INTO users
            SET linkActivation = $2
            WHERE id = $1`,
        [id, linkActivation])
    }

    async UpdateResetTokens(id: UserIdDto, resetToken: string) {
        await db.query(`
            UPDATE INTO users
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
}

export default new UserRepository();