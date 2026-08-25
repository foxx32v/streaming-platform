import axios from "axios";
import { GetCookie, SetCookie, DeleteCookie } from "../utils";
import { GLOBAL_API } from "../configs";
import { useAuthStore, usePageStore } from "../store";

const axiosInstance = axios.create({
    baseURL: GLOBAL_API.serverUrl,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshToken = GetCookie('refreshToken')
                if (!refreshToken) {
                    redirectToLogin()
                    return Promise.reject(error)
                }
                const { data } = await axios.post(
                    `${GLOBAL_API.serverUrl}/auth/refresh`,
                    { refreshToken }
                )
                if (data?.accessToken && data?.refreshToken) {
                    SetCookie('accessToken', data.accessToken, 1/96)
                    SetCookie('refreshToken', data.refreshToken, 7)
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
                    return axiosInstance(originalRequest)
                } else {
                    redirectToLogin()
                    return Promise.reject(error)
                }} catch (refreshError) {
                redirectToLogin()
                return Promise.reject(refreshError)
            }} return Promise.reject(error)
        }
)

const redirectToLogin = () => {
    DeleteCookie('accessToken')
    DeleteCookie('refreshToken')
    if (typeof window !== 'undefined') {
        usePageStore.getState().setPage('login')
        useAuthStore.getState().setAuth(false)
    }
}

const CreateHeaders = async (isAuthToken: boolean): Promise<Record<string, string>> => {
    let headers = {}
    if (isAuthToken) {
        const accessToken = await GetCookie('accessToken')
        if (accessToken) headers = { Authorization: `Bearer ${accessToken}` }
    } return headers
}

export const AxiosPost = async <T>(url: string, body: unknown, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.post<T>(`${GLOBAL_API.serverUrl}${url}`, body, { headers })
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message
            const statusCode = error.response?.status || 500
            throw { message, statusCode } as any
        } throw error
    }
}

export const AxiosGet = async <T>(url: string, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.get<T>(`${GLOBAL_API.serverUrl}${url}`, { headers })
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message
            const statusCode = error.response?.status || 500
            throw { message, statusCode } as any
        } throw error
    }
}

export const AxiosDelete = async <T>(url: string, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.delete<T>(`${GLOBAL_API.serverUrl}${url}`, { headers })
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message
            const statusCode = error.response?.status || 500
            throw { message, statusCode } as any
        } throw error
    }
}

export const AxiosPatch = async <T>(url: string, body: unknown, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.patch<T>(`${GLOBAL_API.serverUrl}${url}`, body, { headers })
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message
            const statusCode = error.response?.status || 500
            throw { message, statusCode } as any
        } throw error
    }
}

export const AxiosPut = async <T>(url: string, body: unknown, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.put<T>(`${GLOBAL_API.serverUrl}${url}`, body, { headers })
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message
            const statusCode = error.response?.status || 500
            throw { message, statusCode } as any
        } throw error
    }
}