import axios from "axios"
import { ApiError, ResponseDto } from "../../dto";

const AxiosError = (error) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message
        const statusCode = error.response?.status || 500
        throw new ApiError( message, statusCode )
    } throw error
}

export const AxiosPost = async <T>(url: string, body: unknown, headers: any, query: any): Promise<T> => {
    try {
        const { data } = await axios.post<T>(`${url}`, body, { headers, params: query })
        return data
    } catch (error) {return AxiosError(error)}
}

export const AxiosGet = async <T>(url: string, headers: any, query: any): Promise<T> => {
    try {
        const { data } = await axios.get<T>(`${url}`, { headers, params: query })
        return data;
    } catch (error) {return AxiosError(error)}
}

export const AxiosDelete = async <T>(url: string, headers: any, query: any): Promise<T> => {
    try {
        const { data } = await axios.delete<T>(`${url}`, { headers, params: query })
        return data
    } catch (error) {return AxiosError(error)}
}

export const AxiosPatch = async <T>(url: string, body: unknown, headers: any, query: any): Promise<T> => {
    try {
        const { data } = await axios.patch<T>(`${url}`, body, { headers, params: query })
        return data
    } catch (error) {return AxiosError(error)}
}

export const AxiosPut = async <T>(url: string, body: unknown, headers: any, query: any): Promise<T> => {
    try {
        const { data } = await axios.put<T>(`${url}`, body, { headers, params: query })
        return data;
    } catch (error) {return AxiosError(error)}
}

export const AxiosRequest = async (url: string, method?: string, body?: any, headers?: any, query?:any): Promise<ResponseDto> => {
    switch (method || "GET") {
        case 'POST': return await AxiosPost(url, body, headers, query)
        case 'GET': return await AxiosGet(url, headers, query)
        case 'PUT': return await AxiosPut(url, body, headers, query)
        case 'PATCH': return await AxiosPatch(url, body, headers, query)
        case 'DELETE': return await AxiosDelete(url, headers, query)
        default: throw new Error(`Unsupported method: ${method}`)
    }
}