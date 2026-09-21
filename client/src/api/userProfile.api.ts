import { GLOBAL_API, PATH_API } from "../configs";
import { IResponse, IUserProfile, IUpdateUserProfile, IFollowResponse, IUnfollowResponse, IGetFollowersResponse, IGetFollowingResponse, IGetStatsResponse, IGetSettingsResponse, IUpdateSettings, IPagination, IGetAllUsersResponse, IChangeRole } from "../dto";
import { AxiosGet, AxiosPost, AxiosDelete, AxiosPatch } from "./";

class UserProfileApi {
    async GetMe() {return AxiosGet<IResponse<IUserProfile>>(`${PATH_API.user}/me`, true)}
    async UpdateMe(body: IUpdateUserProfile) {return AxiosPatch<IResponse<IUserProfile>>(`${PATH_API.user}/me`, body, true)}
    async DeleteMe() {return AxiosDelete<IResponse>(`${PATH_API.user}/me`, true)}
    async GetSettings() {return AxiosGet<IResponse<IGetSettingsResponse>>(`${PATH_API.user}/me/settings`, true)}
    async UpdateSettings(body: IUpdateSettings) {return AxiosPatch<IResponse<IGetSettingsResponse>>(`${PATH_API.user}/me/settings`, body, true)}
    async GetUserById(userId: string) {return AxiosGet<IResponse<IUserProfile>>(`${PATH_API.user}/${userId}`)}
    async FollowUser(userId: string) {return AxiosPost<IResponse<IFollowResponse>>(`${PATH_API.user}/${userId}/follow`, {}, true)}
    async UnfollowUser(userId: string) {return AxiosDelete<IResponse<IUnfollowResponse>>(`${PATH_API.user}/${userId}/follow`, true)}
    async GetFollowers(userId: string) {return AxiosGet<IResponse<IGetFollowersResponse>>(`${PATH_API.user}/${userId}/followers`)}
    async GetFollowing(userId: string) {return AxiosGet<IResponse<IGetFollowingResponse>>(`${PATH_API.user}/${userId}/following`)}
    async GetStats(userId: string) {return AxiosGet<IResponse<IGetStatsResponse>>(`${PATH_API.user}/${userId}/stats`)}
    async Init(body: { userName: string }) {return AxiosPost<IResponse>(`${PATH_API.user}/init`, body, true)}
    async GetAllUsers(params: IPagination) {return AxiosGet<IResponse<IGetAllUsersResponse>>(`${PATH_API.user}?page=${params.page || 1}&limit=${params.limit || 20}`, true)}
    async DeleteUser(userId: string) {return AxiosDelete<IResponse>(`${PATH_API.user}/${userId}`, true)}
    async ChangeRole(userId: string, body: IChangeRole) {return AxiosPatch<IResponse<IUserProfile>>(`${PATH_API.user}/${userId}/role`, body, true)}
    async BanUser(userId: string) {return AxiosPost<IResponse<IUserProfile>>(`${PATH_API.user}/${userId}/ban`, {}, true)}
    async UnbanUser(userId: string) {return AxiosPost<IResponse<IUserProfile>>(`${PATH_API.user}/${userId}/unban`, {}, true)}
}

export const userProfileApi = new UserProfileApi();