import axios from "axios";
import { CookieParser } from "../utils";
import { GLOBAL_API } from "../configs";

const CreateHeaders = async (isAuthToken: boolean): Promise<Record<string, string>> => {
    let headers = {}
    if (isAuthToken) {const accessToken = await CookieParser('accessToken')
    if (accessToken) headers = {Authorization: `Bearer ${accessToken}`}}
    return headers
}

export const AxiosPost = async <T>(url: string, body: unknown, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.post<T>(`${GLOBAL_API.serverUrl}${url}`, body, {headers})
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) throw new Error(error.response?.data?.message || error.message)
        throw error}
}

export const AxiosGet = async <T>(url: string, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.get<T>(`${GLOBAL_API.serverUrl}${url}`, {headers})
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) throw new Error(error.response?.data?.message || error.message)
        throw error}
}

export const AxiosDelete = async <T>(url: string, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.delete<T>(`${GLOBAL_API.serverUrl}${url}`, {headers})
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) throw new Error(error.response?.data?.message || error.message)
        throw error}
}

export const AxiosPatch = async <T>(url: string, body: unknown, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.patch<T>(`${GLOBAL_API.serverUrl}${url}`, body, {headers})
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) throw new Error(error.response?.data?.message || error.message)
        throw error}
}

export const AxiosPut = async <T>(url: string, body: unknown, isAuthToken: boolean = false): Promise<T> => {
    try {
        const headers = await CreateHeaders(isAuthToken)
        const { data } = await axios.put<T>(`${GLOBAL_API.serverUrl}${url}`, body, {headers})
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) throw new Error(error.response?.data?.message || error.message)
        throw error}
}