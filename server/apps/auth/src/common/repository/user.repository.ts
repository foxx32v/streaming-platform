import { UUID } from "crypto";
import { db } from "../helper/db/db";
import { UserDto } from "../dto/db/user.dto";
import { TokensType } from "../helper/types/helperTypes";

class UserRepository {
    async CreateUser(user: UserDto) {
        await db.query(`
            INSERT INTO users
            (email, password, userName, linkActivate, avatarColor)
            VALUES($1,$2,$3,$4,$5)`,
        [user.email, user.password, user.userName, user.linkActivate, user.avatarColor]);
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
}

export default new UserRepository();