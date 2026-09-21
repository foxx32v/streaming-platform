import { UserProfileDto } from "../dto";
import { db } from "../urils";

class UserRepository {
    async CreateUserProfile (id: string, userName: string, avatarColor: string) {
        await db.query(`
        INSERT INTO user_profiles
        (id, user_name, avatar_color, created_at, updated_at)
        VALUES($1, $2, $3, NOW(), NOW())`,
        [id, userName, avatarColor])
    }

    async GetUserProfileById (userId: string): Promise<UserProfileDto|null> {
        const result = await db.query(`
        SELECT * FROM user_profiles
        WHERE id = $1 AND
        deleted_at IS NULL`,
        [userId])
        return result.rows[0] ?? null
    }

    async GetUserProfileByUserName (userName: string): Promise<UserProfileDto|null> {
        const result = await db.query(`
        SELECT * FROM user_profiles
        WHERE user_name = $1 AND
        deleted_at IS NULL`,
        [userName])
        return result.rows[0] ?? null
    }

    async UpdateUserName (userId: string, userName: string) {
        await db.query(`
        UPDATE user_profiles
        SET user_name = $1, updated_at = NOW()
        WHERE id = $2`,
        [userName, userId])
    }

    async UpdateRole (userId: string, role: 'user'|'admin') {
        await db.query(`
        UPDATE user_profiles
        SET role = $1, updated_at = NOW()
        WHERE id = $2`,
        [role, userId])
    }

    async BlockedUser (userId: string, isBlock: boolean) {
        await db.query(`
        UPDATE user_profiles
        SET is_blocked = $1, updated_at = NOW()
        WHERE id = $2`,
        [isBlock, userId])
    }

    async UpdateStatus (userId: string, status: string) {
        await db.query(`
        UPDATE user_profiles
        SET status = $1, updated_at = NOW()
        WHERE id = $2`,
        [status, userId])
    }

    async UpdateSeen (userId: string) {
        await db.query(`
        UPDATE user_profiles
        SET last_seen_at = NOW()
        WHERE id = $1`,
        [userId])
    }

    async IsExistUserProfile (userId: string): Promise<boolean> {
        const result = await db.query(`
        SELECT 1 FROM user_profiles
        WHERE id = $1 AND deleted_at IS NULL`,
        [userId])
        return result.rowCount > 0
    }

    async CreateSettingsByUserId (userId: string) {
        await db.query(`
        INSERT INTO settings
        (user_id, created_at, updated_at)
        VALUES($1, NOW(), NOW())`,
        [userId])
    }

    async UpdatePrivateProfileByUserId (userId: string, privateProfile: boolean) {
        await db.query(`
        UPDATE settings
        SET private_profile = $2, updated_at = NOW()
        WHERE user_id = $1`,
        [userId, privateProfile])
    }

    async ShowEmailInSettingsByUserId (userId: string, showEmail: boolean) {
        await db.query(`
        UPDATE settings
        SET show_email = $2, updated_at = NOW()
        WHERE user_id = $1`,
        [userId, showEmail])
    }

    async ShowPhoneInSettingsByUserId (userId: string, showPhone: boolean) {
        await db.query(`
        UPDATE settings
        SET show_phone = $2, updated_at = NOW()
        WHERE user_id = $1`,
        [userId, showPhone])
    }

    async GetSettingsByUserId (userId: string) {
        const result = await db.query(`
        SELECT * FROM settings
        WHERE user_id = $1`,
        [userId])
        return result.rows[0] ?? null
    }

    async SubscribeOnUser (followingId: string, followerId: string) {
        await db.query(`
        INSERT INTO subscriptions
        (following_id, follower_id, created_at, updated_at)
        VALUES($1, $2, NOW(), NOW())`,
        [followingId, followerId])
    }

    async UnSubscribeFromUser (followingId: string, followerId: string) {
        await db.query(`
        UPDATE subscriptions
        SET deleted_at = NOW()
        WHERE following_id = $1 AND follower_id = $2`,
        [followingId, followerId])
    }

    async IsExistSubscribe (followingId: string, followerId: string): Promise<boolean> {
        const result = await db.query(`
        SELECT 1 FROM subscriptions
        WHERE following_id = $1 AND follower_id = $2
        AND deleted_at IS NULL`,
        [followingId, followerId])
        return result.rowCount > 0
    }

    async GetFollowers (userId: string) {
        const result = await db.query(`
        SELECT up.* FROM subscriptions s
        JOIN user_profiles up ON up.id = s.follower_id
        WHERE s.following_id = $1
        AND s.deleted_at IS NULL
        AND up.deleted_at IS NULL`,
        [userId])
        return result.rows
    }

    async GetFollowing (userId: string) {
        const result = await db.query(`
        SELECT up.* FROM subscriptions s
        JOIN user_profiles up ON up.id = s.following_id
        WHERE s.follower_id = $1
        AND s.deleted_at IS NULL
        AND up.deleted_at IS NULL`,
        [userId])
        return result.rows
    }

    async CountFollowers (userId: string): Promise<number> {
        const result = await db.query(`
        SELECT COUNT(*) FROM subscriptions
        WHERE following_id = $1 AND deleted_at IS NULL`,
        [userId])
        return parseInt(result.rows[0].count, 10)
    }

    async CountFollowing (userId: string): Promise<number> {
        const result = await db.query(`
        SELECT COUNT(*) FROM subscriptions
        WHERE follower_id = $1 AND deleted_at IS NULL`,
        [userId])
        return parseInt(result.rows[0].count, 10)
    }

    async GetAllUsers (page: number = 1, limit: number = 20) {
        const offset = (page - 1) * limit
        const result = await db.query(`
        SELECT * FROM user_profiles
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2`,
        [limit, offset])
        return result.rows
    }

    async DeleteUserProfile (userId: string) {
        await db.query(`
        UPDATE user_profiles
        SET deleted_at = NOW()
        WHERE id = $1`,
        [userId])
    }

    async UpdateAvatarColor (userId: string, avatarColor: string) {
        await db.query(`
        UPDATE user_profiles
        SET avatar_color = $1, updated_at = NOW()
        WHERE id = $2`,
        [avatarColor, userId])
    }

    async GetStats (userId: string) {
        const followers = await this.CountFollowers(userId)
        const following = await this.CountFollowing(userId)
        return { followers, following }
    }

    async Init (userId: string, userName: string, avatarColor: string) {
        await this.CreateUserProfile(userId, userName, avatarColor)
        await this.CreateSettingsByUserId(userId)
    }
}

export const userRepository = new UserRepository();