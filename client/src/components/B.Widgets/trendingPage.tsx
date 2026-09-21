import { useUserProfile } from '../../hooks/userProfile.hook';

export const TrendingPage = () => {
    const { data, message, error, isLoading, status, statusCode, GetMe, UpdateMe, DeleteMe, GetSettings, UpdateSettings, GetUserById, FollowUser, UnfollowUser, GetFollowers, GetFollowing, GetStats, Init, GetAllUsers, DeleteUser, ChangeRole, BanUser, UnbanUser } = useUserProfile()
    return (
        <div>
            <button onClick={() => GetMe()}>Get Me</button>
            <button onClick={() => UpdateMe({ userName: 'new_name', status: 'Стримлю' })}>Update Me</button>
            <button onClick={() => DeleteMe()}>Delete Me</button>

            <button onClick={() => GetSettings()}>Get Settings</button>
            <button onClick={() => UpdateSettings({ privateProfile: true, showEmail: false })}>Update Settings</button>

            <button onClick={() => GetUserById('some-uuid')}>Get User By Id</button>
            <button onClick={() => FollowUser('some-uuid')}>Follow</button>
            <button onClick={() => UnfollowUser('some-uuid')}>Unfollow</button>
            <button onClick={() => GetFollowers('some-uuid')}>Get Followers</button>
            <button onClick={() => GetFollowing('some-uuid')}>Get Following</button>
            <button onClick={() => GetStats('some-uuid')}>Get Stats</button>

            <button onClick={() => Init({ userName: 'test' })}>Init</button>
            <button onClick={() => GetAllUsers({ page: 1, limit: 20 })}>Get All Users</button>
            <button onClick={() => DeleteUser('some-uuid')}>Delete User</button>
            <button onClick={() => ChangeRole('some-uuid', { role: 'admin' })}>Change Role</button>
            <button onClick={() => BanUser('some-uuid')}>Ban</button>
            <button onClick={() => UnbanUser('some-uuid')}>Unban</button>

            <pre>{JSON.stringify({ data, message, error, isLoading, status, statusCode }, null, 2)}</pre>
        </div>
    )
}