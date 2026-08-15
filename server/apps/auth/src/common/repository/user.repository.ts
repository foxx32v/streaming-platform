import { UUID } from "crypto";
import { db } from "../helper/db/db";
import { UserDto } from "../dto/db/user.dto";
import { ColorType, TokensType } from "../helper/types/helperTypes";
import { EmailDto } from "../dto/api";

class UserRepository {
    async CreateUser(email: string, passwordHash: string, userName: string, linkActivate: string, avatarColor: ColorType) {
        await db.query(`
            INSERT INTO users
            (email, passwordHash, userName, linkActivate, avatarColor)
            VALUES($1,$2,$3,$4,$5)`,
        [email, passwordHash, userName, linkActivate, avatarColor]);
    }

    async ResetEmail(id: UUID, email: string) {
        await db.query(`
            UPDATE users
            SET email = $2
            WHERE id = $1`,
        [id, email])
    }

    async ResetPassword(id: UUID, hashPassword: string) {
        await db.query(`
            UPDATE users
            SET password = $2
            WHERE id = $1`,
        [id, hashPassword])
    }

    async GetUserById(id: UUID) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE id = $1`,
        [id])
        return user
    }

    async GetUserByEmail(email: string) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE email = $1`,
        [email])
        return user
    }

    async GetUserByUserName(userName: string) {
        const user = await db.query(`
            SELECT * FROM users
            WHERE userName = $1`,
        [userName])
        return user
    }

    async ExistsByEmail(email: string) {
        try {
        const result = await db.query(`
            SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`,
        [email])
        return result.rows[0].exists
        } catch (error) {console.error(error)}
    }

    async ExistsByUserName(userName: string) {
        const result = await db.query(`
            SELECT EXISTS(SELECT 1 FROM users WHERE userName = $1)`,
        [userName])
        return result.rows[0].exists
    }

    async ChangeUserRole(id: UUID, role: string) {
        await db.query(`
            UPDATE users
            SET role = $2
            WHERE id = $1`,
        [id, role])
    }

    async ChangeBlockUser(id: UUID, isBlock: boolean) {
        await db.query(`
            UPDATE users
            SET isBlocked = $2
            WHERE id = $1`,
        [id, isBlock])
    }

    async GetTokens(id: UUID) {
        const tokens = await db.query(`
            SELECT refreshToken, accessToken
            FROM users
            WHERE id = $1`,
        [id])
        return tokens
    }

    async UpdateTokens(id: UUID, tokens: TokensType) {
        await db.query(`
            UPDATE users
            SET refreshToken = $2, accessToken = $3
            WHERE id = $1`,
        [id, tokens.access, tokens.refresh])
    }

    async UpdateLastSeen(id: UUID) {
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
        return users
    }

    async CountUsers() {
        const result = await db.query(`
            SELECT COUNT(*) FROM users`)
        return parseInt(result.rows[0].count)
    }

    async DeleteUser(id: UUID) {
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
        return user
    }

    async UpdateRefreshToken(id: UUID, refreshToken: string) {
        await db.query(`
            UPDATE users
            SET refreshToken = $2
            WHERE id = $1`,
        [id, refreshToken])
    }
}

export default new UserRepository();