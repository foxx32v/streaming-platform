import { useState } from "react"
import { userProfileApi } from "../api"
import { IResponse, IError, IUserProfile, IUpdateUserProfile, IGetSettingsResponse, IUpdateSettings, IGetFollowersResponse, IGetFollowingResponse, IGetStatsResponse, IFollowResponse, IUnfollowResponse, IGetAllUsersResponse, IPagination, IChangeRole } from "../dto"

type UserProfileData =
    | IUserProfile
    | IGetSettingsResponse
    | IGetFollowersResponse
    | IGetFollowingResponse
    | IGetStatsResponse
    | IFollowResponse
    | IUnfollowResponse
    | IGetAllUsersResponse
    | null

export const useUserProfile = () => {
    const [data, SetData] = useState<UserProfileData>(null)
    const [message, SetMessage] = useState<string|null>(null)
    const [error, SetError] = useState<null|string>(null)
    const [isLoading, SetIsLoading] = useState<boolean>(false)
    const [status, SetStatus] = useState<"loading" | "error" | "success" | null>(null)
    const [statusCode, SetStatusCode] = useState<number|null>(null)

    const Start = () => {
        SetIsLoading(true)
        SetStatus('loading')
        SetMessage(null)
        SetError(null)
        SetStatusCode(null)
    }

    const End = (res: IResponse) => {
        SetIsLoading(false)
        SetMessage(res.message ?? null)
        SetError(null)
        SetData(res.data as UserProfileData)
        SetStatus('success')
        SetStatusCode(res.statusCode)
    }

    const IsError = (error?: null|string, statusCode?: number|null) => {
        SetIsLoading(false)
        SetMessage(null)
        SetError(error??null)
        SetStatus('error')
        SetStatusCode(statusCode??null)
    }

    const GetMe = async (): Promise<IResponse<IUserProfile>> => {
        try {
            Start(); const res = await userProfileApi.GetMe()
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const UpdateMe = async (body: IUpdateUserProfile): Promise<IResponse<IUserProfile>> => {
        try {
            Start(); const res = await userProfileApi.UpdateMe(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const DeleteMe = async (): Promise<IResponse> => {
        try {
            Start(); const res = await userProfileApi.DeleteMe()
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetSettings = async (): Promise<IResponse<IGetSettingsResponse>> => {
        try {
            Start(); const res = await userProfileApi.GetSettings()
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const UpdateSettings = async (body: IUpdateSettings): Promise<IResponse<IGetSettingsResponse>> => {
        try {
            Start(); const res = await userProfileApi.UpdateSettings(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetUserById = async (userId: string): Promise<IResponse<IUserProfile>> => {
        try {
            Start(); const res = await userProfileApi.GetUserById(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const FollowUser = async (userId: string): Promise<IResponse<IFollowResponse>> => {
        try {
            Start(); const res = await userProfileApi.FollowUser(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const UnfollowUser = async (userId: string): Promise<IResponse<IUnfollowResponse>> => {
        try {
            Start(); const res = await userProfileApi.UnfollowUser(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetFollowers = async (userId: string): Promise<IResponse<IGetFollowersResponse>> => {
        try {
            Start(); const res = await userProfileApi.GetFollowers(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetFollowing = async (userId: string): Promise<IResponse<IGetFollowingResponse>> => {
        try {
            Start(); const res = await userProfileApi.GetFollowing(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetStats = async (userId: string): Promise<IResponse<IGetStatsResponse>> => {
        try {
            Start(); const res = await userProfileApi.GetStats(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const Init = async (body: { userName: string }): Promise<IResponse> => {
        try {
            Start(); const res = await userProfileApi.Init(body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const GetAllUsers = async (params: IPagination): Promise<IResponse<IGetAllUsersResponse>> => {
        try {
            Start(); const res = await userProfileApi.GetAllUsers(params)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const DeleteUser = async (userId: string): Promise<IResponse> => {
        try {
            Start(); const res = await userProfileApi.DeleteUser(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const ChangeRole = async (userId: string, body: IChangeRole): Promise<IResponse<IUserProfile>> => {
        try {
            Start(); const res = await userProfileApi.ChangeRole(userId, body)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const BanUser = async (userId: string): Promise<IResponse<IUserProfile>> => {
        try {
            Start(); const res = await userProfileApi.BanUser(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    const UnbanUser = async (userId: string): Promise<IResponse<IUserProfile>> => {
        try {
            Start(); const res = await userProfileApi.UnbanUser(userId)
            End(res); return res
        } catch (error: unknown) {
            const err = error as IError
            IsError(err.message, err.statusCode); throw error
        }
    }

    return {data, message, error, isLoading, status, statusCode, GetMe, UpdateMe, DeleteMe, GetSettings, UpdateSettings, GetUserById, FollowUser, UnfollowUser, GetFollowers, GetFollowing, GetStats, Init, GetAllUsers, DeleteUser, ChangeRole, BanUser, UnbanUser}
}