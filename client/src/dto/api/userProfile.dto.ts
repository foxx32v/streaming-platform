export interface IUserProfile {
    id: string;
    userName: string;
    role: 'user' | 'admin';
    avatarColor: string;
    status: string;
    isBlocked: boolean;
    lastSeenAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface IUpdateUserProfile {
    userName?: string;
    status?: string;
}

export interface IGetSettingsResponse {
    id: string;
    userId: string;
    privateProfile: boolean;
    showPhone: boolean;
    showEmail: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUpdateSettings {
    privateProfile?: boolean;
    showPhone?: boolean;
    showEmail?: boolean;
}

export interface IFollowResponse {
    followingId: string;
}

export interface IUnfollowResponse {
    followingId: string;
}

export interface IGetFollowersResponse {
    followers: IUserProfile[];
}

export interface IGetFollowingResponse {
    following: IUserProfile[];
}

export interface IGetStatsResponse {
    followers: number;
    following: number;
}

export interface IChangeRole {
    role: 'user' | 'admin';
}