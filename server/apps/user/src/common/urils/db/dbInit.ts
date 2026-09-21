import { db } from "../";

export const DbInit = async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY,
    user_name VARCHAR UNIQUE NOT NULL,
    avatar_color VARCHAR,
    status VARCHAR,
    is_blocked BOOLEAN DEFAULT FALSE,
    last_seen_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP DEFAULT NULL
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES user_profiles(id)
    ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES user_profiles(id)
    ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP,
    UNIQUE (follower_id, following_id)
    );
    CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES user_profiles
    (id) ON DELETE CASCADE,
    private_profile BOOLEAN NOT NULL DEFAULT false,
    show_phone BOOLEAN NOT NULL DEFAULT false,
    show_email BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
    `);
}