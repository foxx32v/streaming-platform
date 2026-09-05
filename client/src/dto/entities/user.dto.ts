export interface userDto {
    id: string
    email: string
    password: string
    userName: string
    refreshToken: string
    accessToken: string
    role: string
    avatarColor: string
    isActivate: boolean
    isBlocked: boolean
    status: string
    linkActivate: string
    lastSeenAt: Date
    deletedAt: Date
    createdAt: Date
    updatedAt: Date
    subscriptionExpiresAt: Date
    subscriptionTier: string
    isPremium: boolean
    stripeCustomerId: string
    reason: string
}